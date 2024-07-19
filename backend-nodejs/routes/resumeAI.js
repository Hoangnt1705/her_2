import express from 'express';
import puppeteer from 'puppeteer';
import { io } from 'socket.io-client';
import { verifyStaff, verifyToken, rateLimitAPI } from '../middleware/index.js'
import { EVENT, SOCKET_URL } from '../constant.js';
import { sendError, sendServerError, sendSuccess, sendAutoMail, sendAutoSMS } from '../helper/client.js';
import ResumeTemplateSchema from '../model/ResumeTemplate.js';
import bucket from '../firebase/firebase-config.js'; // Import your Firebase Storage bucket
import multer from 'multer';
import fs from 'fs';
import uuid from 'uuid-v4';
// ... your routes
const resumeAIRoute = express.Router();

const upload = multer({ dest: 'uploads/' }); // Temporary storage

const generateResume = async (content) => {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
    timeout: 60000 // Increase timeout to 60 seconds
  });

  const page = await browser.newPage();

  await page.setContent(content, {
    waitUntil: 'networkidle2' // Wait until the network is idle
  });
  const pdf = await page.pdf({ format: 'A4' });

  await browser.close();
  return pdf;
};

/**
 * @route POST /api/v1/resume-ai/
 * @description post personal and work information data and then transfer it to python's socket io for ai to handle, create cv and then respond to the client
 * @access private
 */

resumeAIRoute.post('/', verifyToken, async (req, res) => {
  res.contentType('application/pdf');
  try {
    const { htmlContent } = req.body;
    console.log('Received HTML content:', htmlContent);
    const pdf = await generateResume(htmlContent);
    sendSuccess(res, 'Success', pdf); // This will generate a array buffer stream
  } catch (error) {
    console.error('Error generating PDF:', error);
    sendError(res, 'Error generating PDF');
  }
});

// Upload PDF Route
resumeAIRoute.post('/upload', upload.single('pdfFile'), async (req, res) => {
  try {
    const file = req.file;
    const filePath = file.path; // Get the temporary file path

    // Upload the file using the file path
    const [fileMetadata] = await bucket.upload(filePath, {
      destination: `pdfs/${file.originalname}`, // Customize the path
      metadata: {
        firebaseStorageDownloadTokens: uuid(),
        contentType: 'application/pdf' // Set the content type to 'application/pdf'
      }
    });

    res.json({
      message: 'PDF uploaded successfully',
      pdfUrl: `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${fileMetadata.name}?alt=media`
    });
    // Delete the temporary file after successful upload
    fs.unlink(filePath, (err) => {
      if (err) {
        console.error('Error deleting temporary file:', err);
      } else {
        console.log('Temporary file deleted successfully.');
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to upload PDF' });
  }
});

// Download PDF Route
resumeAIRoute.get('/download/:filename', async (req, res) => {
  try {
    const file = bucket.file(`pdfs/${req.params.filename}`); // Customize the path
    const [data] = await file.get();

    res.setHeader('Content-Type', 'application/pdf'); // Set the content type to 'application/pdf'
    res.setHeader('Content-Disposition', `attachment; filename="${req.params.filename}"`);
    res.send(data[0].content);
  } catch (error) {
    console.error(error);
    // res.status(404).json({ error: 'File not found' });
    sendError(res, 'File not found');

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

export default resumeAIRoute;