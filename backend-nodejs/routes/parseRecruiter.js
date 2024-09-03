import express from 'express'
import { verifyStaff, verifyToken, rateLimitAPI } from '../middleware/index.js'
import { sendError, sendServerError, sendSuccess, sendAutoMail, sendAutoSMS } from '../helper/client.js';
import { printIn } from '../service/consoleLog.js';
import ParseRecruiterChat from '../model/ParseRecruiterChat.js';
import ParseRecruiterDocument from '../model/ParseRecruiterDocument.js';
import { getRedis } from '../db/index.js';
import { pySocket } from '../socket/index.js';
const prRoute = express.Router()

/**
 * @route POST /api/v1/parse-recruiter/
 * @description get api ai parse recruiter, store data, and return id data 
 * @access private
 */

prRoute.post('/', rateLimitAPI, verifyToken, async (req, res) => {
  try {
    let { data, cid } = req.body;
    printIn('cid', cid);

    // Get Redis client
    const { instanceConnect: redisClient } = await getRedis();
    let cidAuthenticated;

    // Trim and validate input data
    data = data.trim();
    if (!data) return sendError(res, 'Data is missing');

    // Check if the chat ID (cid) exists if provided
    if (cid) {
      cidAuthenticated = await ParseRecruiterChat.exists({ _id: cid });
      if (!cidAuthenticated) return sendError(res, "Forbidden!", 403);
    }

    let resFlask;

    // Check if the data exists in the cache
    const cachedResult = await redisClient.get(data);
    if (cachedResult) {
      resFlask = JSON.parse(cachedResult);
    } else {
      // Emit event to Python socket server
      pySocket.emit('parse-recruiter', { msg: data.trim() });

      // Wait for the response or an error
      resFlask = await new Promise((resolve, reject) => {
        pySocket.once('parse-recruiter', data => resolve(data));
        pySocket.once('error', error => reject(error));
      });

      // Cache the result for future requests
      await redisClient.set(data, JSON.stringify(resFlask), { EX: 3600 });
    }

    let chat;

    // Handle chat creation if not authenticated
    if (!cidAuthenticated) {
      chat = await ParseRecruiterChat.create({
        title: resFlask.data?.title || 'error',  // Simplified ternary expression
        user: req.user.id,
      });

      chat = chat.toObject();  // Convert the Mongoose document to a plain JavaScript object
      chat.source = "ParseRecruiterChat";
    }

    // Ensure chat is defined properly before creating the document
    const chatId = cidAuthenticated ? cid : chat._id;
    if (!chatId) return sendError(res, "Chat ID could not be determined.", 500);

    // Create the document with the correct chat ID
    const document = await ParseRecruiterDocument.create({
      sender: data,
      receiver: resFlask,
      chat: chatId,
    });

    // Log the chat object for debugging purposes
    printIn(chat);

    // Send success response
    return sendSuccess(res, cachedResult ? 'Data retrieved from cache.' : 'Data processed successfully',
      { result: cidAuthenticated ? document : chat });

  } catch (error) {
    console.error(error);
    sendError(res, 'An unexpected error occurred.', 500);
  }
});


/**
 * @route GET /api/v1/parse-recruiter/document
 * @description get data parse recruiter by id
 * @access private
 */

prRoute.get('/document/:cid', verifyToken, async (req, res) => {
  try {
    const { cid } = req.params;
    const { id } = req.user;
    console.log('id', id);

    // Find the chat documents
    const chat = await ParseRecruiterChat.find({
      $and: [
        { _id: { $ne: null, $eq: cid } },
        { user: { $ne: null, $eq: id } },
      ]
    });

    // Check if any chat documents were found
    if (chat.length === 0) {
      console.log('No chat documents found');
      return sendError(res, 'No chat documents found');
    }
    if (chat[0].deleted) {
      console.log('No chat documents found');
      return sendError(res, 'No chat documents found');
    }
    // Log the IDs of the found chat documents
    chat.forEach(c => console.log('chat', c._id));

    // Find the document based on the chat IDs
    const document = await ParseRecruiterDocument.find({
      chat: { $ne: null, $in: chat.map(c => c._id) }
    }).populate({
      path: 'chat',
      model: ParseRecruiterChat,
    }).sort({ updatedAt: -1 });

    return sendSuccess(res, 'okee', { result: document });

  } catch (error) {
    console.error(error);
    sendError(res, 'An unexpected error occurred.', 500);
  }
});

export default prRoute;