
import express from 'express'
import { verifyStaff, verifyToken, rateLimitAPI } from '../middleware/index.js'
import { io } from 'socket.io-client';
import { EVENT, SOCKET_URL } from '../constant.js';
import { sendError, sendServerError, sendSuccess, sendAutoMail, sendAutoSMS } from '../helper/client.js';
import jwt from 'jsonwebtoken'
import { printIn } from '../service/consoleLog.js';
import ParseRecruiterChat from '../model/ParseRecruiterChat.js';
import ParseRecruiterDocument from '../model/ParseRecruiterDocument.js';
import { getRedis } from '../db/index.js';

const chatRoute = express.Router()

/**
 * @route GET /api/v1/chat
 * @description get list chatS parse recruiter and CV with AI
 * @access private
 */

chatRoute.get('/', async (req, res) => {
    const { uid } = req.query;
    try {
        const pageSize = 15
        const page = req.query.page ? parseInt(req.query.page) : 0
        const length = await ParseRecruiterChat.countDocuments
            ({ $and: [{ user: { $ne: null, $eq: uid } }, { title: { $ne: 'error' }}, {deleted: {$ne: true}} ]});
        const listChat = await ParseRecruiterChat.find
            ({ $and: [{ user: { $ne: null, $eq: uid } }, { title: { $ne: 'error' }}, {deleted: {$ne: true}} ]})
            .limit(pageSize)
            .skip(page)
            .sort({ updatedAt: -1 });
        return sendSuccess(res, '', { length, listChat })

    } catch (error) {
        console.log(error);
        sendError(res, error);
    };
});

/**
 * @route PUT /api/v1/chat/description-chat-sidebar
 * @description update title chat in sidebar
 * @access private
 */
chatRoute.put('/description-chat-sidebar', verifyToken, async (req, res) => {
    const { cid, title } = req.body;
    try {
        const chat = await ParseRecruiterChat.findByIdAndUpdate(cid, { title });
        return sendSuccess(res, "update chat successfully.", {chat})
    } catch (error) {
        return sendError(res, error);
    }
})

/**
 * @route PUT /api/v1/chat/description-chat-sidebar/delete
 * @description delete chat in sidebar
 * @access private
 */

chatRoute.put('/description-chat-sidebar/delete', verifyToken, async (req, res) => {
    const {cid}  = req.body;
    try {
        await ParseRecruiterChat.findByIdAndUpdate(cid, { deleted: true });
        return sendSuccess(res, "delete chat successfully.")
    } catch (error) {
        return sendError(res, error);
    }
});

export default chatRoute;