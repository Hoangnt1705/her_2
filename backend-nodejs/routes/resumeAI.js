import express from 'express';
import puppeteer from 'puppeteer';
import { verifyStaff, verifyToken, rateLimitAPI } from '../middleware/index.js'
import { sendError, sendServerError, sendSuccess, sendAutoMail, sendAutoSMS } from '../helper/client.js';
import ResumeTemplateSchema from '../model/ResumeTemplate.js';
import ResumeAiDocument from '../model/ResumeAiDocument.js';
import ResumeAiConversation from '../model/ResumeAiConversation.js';
import bucket from '../firebase/firebase-config.js'; // Import your Firebase Storage bucket
import multer from 'multer';
import fs from 'fs';
import uuid from 'uuid-v4';
import sanitize from 'sanitize-filename';
import { pySocket } from '../socket/index.js';
import { printIn } from '../service/consoleLog.js';
import basic001 from '../resume-templates/basic-001.js';

// ... my routes
const resumeAIRoute = express.Router();

const upload = multer({ dest: 'uploads/' }); // Temporary storage

const generateResume = async (content, title) => {
  try {
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
      timeout: 60000 // Increase timeout to 60 seconds
    });

    const page = await browser.newPage();
    await page.setContent(content, { waitUntil: 'networkidle2' });

    const pdfBuffer = await page.pdf({ format: 'A4' });
    await browser.close();

    // Upload the PDF buffer to Firebase Storage
    const fileName = `resume-ai-pdfs/${uuid() + '--' + Date.now()}.pdf`;
    const token = uuid();

    const file = bucket.file(fileName);
    await file.save(pdfBuffer, {
      metadata: {
        metadata: {
          firebaseStorageDownloadTokens: token
        },
        contentType: 'application/pdf'
      },
      resumable: false // Disable resumable uploads for buffers
    });

    const publicUrl = `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${encodeURIComponent(fileName)}?alt=media&token=${token}`;
    const titleConversationResume = title;
    return {
      titleConversationResume,
      pdfUrl: publicUrl
    };
  } catch (error) {
    console.error('Error uploading PDF:', error);
    throw error; // Re-throw the error to be handled by the route handler
  }
};

/**
 * @route POST /api/v1/resume-ai/upload
 * @description post personal and work information data and then transfer it to python's socket io for ai to handle, create cv and then respond to the client
 * @access private
 */

resumeAIRoute.post('/upload', rateLimitAPI, verifyToken, async (req, res) => {
  const { fullName, email, phoneNumber, birthday, address, zipCode, biography, jobInformation, languageResume, resumeTemplateValue, cid } = req.body;
  let cidAuthenticated;
  let resFlask;
  let conversation;
  if (!fullName && !email && !phoneNumber && !birthday && !address && !biography && !jobInformation && !languageResume) {
    return sendError(res, 'Data in missing');
  }
  console.log('email>>>>>>>>>>>', email, cid, resumeTemplateValue)
  const personal = `FullName: ${fullName}, Email: ${email}, Phone: ${phoneNumber}, Address: ${address}, and Zip Code: ${zipCode}
  Sumary:
  ${biography}
  `;
  const myselfInformation = `Here is my information: ${personal} \n Here is recruitment information: ${jobInformation}`;
  try {
    if (cid) cidAuthenticated = await ResumeAiConversation.exists({ _id: cid, user: req.user.id });
    console.log('cidAuthenticated', cidAuthenticated)

    if (cid && !cidAuthenticated) return sendError(res, "Forbidden!", 403);
    // const { instanceConnect: redisClient } = await getRedis();
    pySocket.emit('resume-ai', {
      'personal': personal,
      'job': jobInformation,
      'language': languageResume
    });
    // Wait for the 'resume-ai' event response from the server

    resFlask = await new Promise((resolve, reject) => {
      pySocket.once('resume-ai', data => resolve(data));
      pySocket.once('error', error => reject(error))
    });
    // Cache the result for future requests
    // redisClient.set(data, JSON.stringify(resFlask), { EX: 3600 });
    printIn(resFlask.data.content);
    let resumeTemplate = await ResumeTemplateSchema.findOne({ _id: resumeTemplateValue }).select({ template: 1, _id: 0 });
    console.log('object', resumeTemplate);
    const functionString = resumeTemplate.template;
    const resumeContent = eval(`(${functionString})`);
    const uploadResult = await generateResume(resumeContent(resFlask.data.content, languageResume), resFlask.data.content.title);
    if (!uploadResult.titleConversationResume && !uploadResult.pdfUrl) return sendError(res, 'Error handling upload', 403);
    if (!cidAuthenticated) {
      conversation = await ResumeAiConversation.create({
        title: uploadResult.titleConversationResume ? uploadResult.titleConversationResume : 'Please try again',
        user: req.user.id,
      });
      conversation = conversation.toObject();  // Convert the Mongoose document to a plain JavaScript object
      conversation.source = "ResumeAiConversation";
      console.log(conversation, 'conversation');
    };
    const document = await ResumeAiDocument.create({
      myself_information: myselfInformation,
      resume_pdf_url: uploadResult.pdfUrl,
      title_resume: uploadResult.titleConversationResume ? uploadResult.titleConversationResume : 'Please try again',
      language: languageResume,
      conversation: cidAuthenticated || conversation._id,
    });
    sendSuccess(res, 'PDF uploaded successfully', { result: cidAuthenticated ? { document } : { conversation, document } });
  } catch (error) {
    console.error('Error handling upload:', error);
    res.status(500).json({ error: 'Failed to upload PDF' });
  }
});

// resumeAIRoute.post('/', verifyToken, async (req, res) => {
//   res.contentType('application/pdf');
//   try {
//     const { htmlContent } = req.body;
//     console.log('Received HTML content:', htmlContent);
//     const pdf = await generateResume(htmlContent);
//     sendSuccess(res, 'Success', pdf); // This will generate a array buffer stream
//   } catch (error) {
//     console.error('Error generating PDF:', error);
//     sendError(res, 'Error generating PDF');
//   }
// });

/**
 * @route POST /api/v1/resume-ai/download/:pdfName/:token
 * @description download pdf resume
 * @access private
 */

resumeAIRoute.get('/download/:pdfName/:token', async (req, res) => {
  try {
    const pdfName = req.params.pdfName;
    const token = req.params.token;

    // Validate the pdfName
    const isValidPdfName = /^[a-zA-Z0-9-_.]+$/.test(pdfName);
    if (!isValidPdfName) {
      return res.status(400).json({ error: 'Invalid file name' });
    }

    const file = bucket.file(`resume-ai-pdfs/${pdfName}`);

    // Check if the token matches the metadata
    const [metadata] = await file.getMetadata().catch((err) => {
      console.error('Error fetching file metadata:', err);
      return res.status(404).json({ error: 'File not found' });
    });
    if (!metadata) return;

    if (metadata.metadata.firebaseStorageDownloadTokens !== token) {
      return res.status(401).json({ error: 'Invalid token' });
    }

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${encodeURIComponent(pdfName)}"`);

    file.createReadStream()
      .on('error', (err) => {
        console.error('Error downloading file:', err);
        res.status(500).end('Failed to download file');
      })
      .pipe(res)
      .on('finish', () => {
        console.log('File downloaded successfully!');
      });
  } catch (error) {
    console.error('Error downloading PDF:', error);
    res.status(500).json({ error: 'Failed to download PDF' });
  }
});

/**
 * @route GET /api/v1/resume-ai/document/:cid
 * @description get data in conversation by id
 * @access private
 */

resumeAIRoute.get('/document/:cid', verifyToken, async (req, res) => {
  try {
    const { cid } = req.params;
    const { id } = req.user;
    console.log('id', id);

    // Find the conversation documents
    const conversation = await ResumeAiConversation.find({
      $and: [
        { _id: { $ne: null, $eq: cid } },
        { user: { $ne: null, $eq: id } },
      ]
    });

    // Check if any conversation documents were found
    if (conversation.length === 0) {
      console.log('No conversation documents found');
      return sendError(res, 'No conversation documents found');
    }
    if (conversation[0].deleted) {
      console.log('No conversation documents found');
      return sendError(res, 'No conversation documents found');
    }
    // Log the IDs of the found conversation documents
    conversation.forEach(c => console.log('conversation', c._id));

    // Find the document based on the conversation IDs
    const document = await ResumeAiDocument.find({
      conversation: { $ne: null, $in: conversation.map(c => c._id) }
    }).populate({
      path: 'conversation',
      model: ResumeAiConversation,
    }).sort({ updatedAt: -1 });

    return sendSuccess(res, 'Get data Successfully.', { result: document });

  } catch (error) {
    console.error(error);
    sendError(res, 'An unexpected error occurred.', 500);
  }
});

// resumeAIRoute.post('/upload', upload.single('image'), async (req, res) => {
//   try {
//     const file = req.file;
//     const filePath = file.path; // Get the temporary file path

//     // Upload the file using the file path
//     const [fileMetadata] = await bucket.upload(filePath, {
//       destination: `images/${file.originalname}`, // Customize the path
//       metadata: {
//         contentType: file.mimetype
//       }
//     });

//     res.json({
//       message: 'Image uploaded successfully',
//       imageUrl: `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${fileMetadata.name}?alt=media`
//     });
//     // Delete the temporary file after successful upload
//     fs.unlink(filePath, (err) => {
//       if (err) {
//         console.error('Error deleting temporary file:', err);
//       } else {
//         console.log('Temporary file deleted successfully.');
//       }
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Failed to upload image' });
//   }
// });

// resumeAIRoute.get('/download/:filename', async (req, res) => {
//   try {
//     const file = bucket.file(`${req.user.uid}/${req.params.filename}`); // Customize the path
//     const [data] = await file.get();

//     res.setHeader('Content-Type', data[0].contentType);
//     res.setHeader('Content-Disposition', `attachment; filename="${req.params.filename}"`);
//     res.send(data[0].content);
//   } catch (error) {
//     console.error(error);
//     // res.status(404).json({ error: 'File not found' });
//     sendError(res, 'File not found');

//   }
// });


/**
 * @route POST /api/v1/resume-ai/test
 * @description Save function into MongoDB
 * @access Public
 */
resumeAIRoute.post('/test', async (req, res) => {
  try {
    // The JavaScript function as a string
    const templateResume = {
      basic001: basic001,
    }
    const resumeContentAsString = templateResume.basic001.toString();

    // Create a new document for system.js collections
    const newFunction = new ResumeTemplateSchema({
      name: "Basic 04",
      symbol: "basic_004",
      image_url: "https://firebasestorage.googleapis.com/v0/b/her-ai-a4653.appspot.com/o/resume-template-images%2Fcv_page-0001.jpg?alt=media&token=91adf947-3879-4cf0-8ad5-d020b27ad841",
      template: resumeContentAsString   // Store the function as a string
    });

    // Save the function into MongoDB
    await newFunction.save();

    // Send success response

    return sendSuccess(res, 'Function saved successfully!', 201);
  } catch (error) {
    // Handle errors
    res.status(500).json({
      success: false,
      message: 'Failed to save function',
      error: error.message
    });
  }
});


/**
 * @route GET /api/v1/resume-ai/test-get
 * @description Save function into MongoDB
 * @access Public
 */
resumeAIRoute.get("/test-get", async (req, res) => {
  try {
    const data = {
      leadership: true,
      skills: [
        {
          technical: ["JavaScript", "MongoDB"],
          language: ["English"],
          laboratory: ["Physics Lab"],
          interests: ["Coding", "Reading"]
        }
      ],
      personal_info: {
        name: "John Doe",
        address: "123 Main St",
        zipcode: "90210",
        email: "john.doe@example.com",
        phone: "123-456-7890"
      },
      education: [
        {
          institution: "ABC University",
          location: "City, Country",
          degree: "Bachelor of Science",
          scores: "3.9 GPA",
          duration: "2016-2020",
          thesis: "Machine Learning",
          relevant_coursework: "Artificial Intelligence"
        }
      ],
      experience: [
        {
          organization: "XYZ Corp",
          location: "City, Country",
          position_title: "Software Engineer",
          duration: "2020-2023",
          description: ["Developed web applications", "Managed databases"],
          projects: ["Project A", "Project B"]
        }
      ],
      leadership_and_actives: [
        {
          organization: "Volunteer Org",
          location: "City, Country",
          role: "Team Leader",
          duration: "2021-2022",
          description: ["Led a team of volunteers", "Organized events"]
        }
      ]
    };
    let result = await ResumeTemplateSchema.findOne({ symbol: 'basic_001' }).select({ template: 1, _id: 0 });
    console.log("result", result);
    res.status(201).json({
      success: true,
      message: 'Function saved successfully!',
      data: resumeHTML
    });
  } catch (error) {
    // Handle errors
    res.status(500).json({
      success: false,
      message: 'Failed to save function',
      error: error.message
    });
  }
})
export default resumeAIRoute;