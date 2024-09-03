
import express from 'express'
import { verifyStaff, verifyToken, rateLimitAPI } from '../middleware/index.js'
import { io } from 'socket.io-client';
import { EVENT, SOCKET_URL } from '../constant.js';
import { sendError, sendServerError, sendSuccess, sendAutoMail, sendAutoSMS } from '../helper/client.js';
import jwt from 'jsonwebtoken'
import { printIn } from '../service/consoleLog.js';
import ParseRecruiterChat from '../model/ParseRecruiterChat.js';
import ResumeAiConversation from '../model/ResumeAiConversation.js';
import { getRedis } from '../db/index.js';

const chatAndConversationRoute = express.Router()

/**
 * @route GET /api/v1/chat-and-conversation
 * @description Get list of chats and conversations, combining data from ParseRecruiterChat and ResumeAiConversation, sorted by latest update time
 * @access private
 */
chatAndConversationRoute.get('/', async (req, res) => {
  const { uid } = req.query;

  try {
    // Set pagination parameters with defaults
    const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 10;
    const page = req.query.page ? parseInt(req.query.page) : 0;
    console.log(pageSize, page);

    // Define all collections with their identifiers
    const collections = [
      {
        model: ParseRecruiterChat,
        source: 'ParseRecruiterChat'
      },
      {
        model: ResumeAiConversation,
        source: 'ResumeAiConversation'
      },
      // Add more collections here as needed
    ];

    // // Determine how many items per collection
    // const itemsPerCollection = Math.floor(pageSize / collections.length);

    // Query each collection with appropriate pagination
    const results = await Promise.all(collections.map(({ model, source }) =>
      model.find({
        user: uid,
        deleted: { $ne: true },
      })
        .sort({ updatedAt: -1 })
        // .skip(page * itemsPerCollection)
        // .limit(itemsPerCollection)
        .lean()
        .then(items => items.map(item => ({ ...item, source })))
    ));

    // Combine and sort all results
    const combinedResults = results.flat().sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));

    // Determine the total length of combined results
    // (If needed, you can also fetch counts from each collection separately for an accurate count)
    // Apply pagination after combining and sorting
    const start = page;
    const paginatedResults = combinedResults.slice(start, start + pageSize);

    // Determine the total length of combined results
    const totalLength = combinedResults.length;
    printIn({
      totalLength,
      results: paginatedResults,
    })
    // Send the paginated response
    return sendSuccess(res, '', {
      totalLength,
      results: paginatedResults,
    });
  } catch (error) {
    console.error(error);
    sendError(res, 'Failed to fetch data.', 500);
  }
});
/**
 * @route PUT /api/v1/chat-and-conversation/description-chat-conversation-sidebar
 * @description update title chat in sidebar
 * @access private
 */
chatAndConversationRoute.put('/description-chat-conversation-sidebar/update', verifyToken, async (req, res) => {
  const { cid, title } = req.body;
  try {
    const chat = await ParseRecruiterChat.findByIdAndUpdate(cid, { title });
    return sendSuccess(res, "update chat successfully.", { chat })
  } catch (error) {
    return sendError(res, error);
  }
})

/**
 * @route PUT /api/v1/chat-and-conversation/description-chat-conversation-sidebar/delete
 * @description delete chat in sidebar
 * @access private
 */

chatAndConversationRoute.put('/description-chat-conversation-sidebar/delete', verifyToken, async (req, res) => {
  const { cid } = req.body;
  try {
    await ParseRecruiterChat.findByIdAndUpdate(cid, { deleted: true });
    return sendSuccess(res, "delete chat successfully.")
  } catch (error) {
    return sendError(res, error);
  }
});
export default chatAndConversationRoute;