
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
 * @route GET /api/v1/parse-recruiter/document
 * @description get list chat parse recruiter and CV with AI
 * @access private
 */

chatRoute.get('/chat', async (req, res) => {
    try {
        const { id } = req.params;
        const test = await ParseRecruiterChat.findById(id).populate({
            path: 'document',
            model: ParseRecruiterDocument
        });
        console.log(test)

        return sendSuccess(res, 'okee', { result: test._doc })

    } catch (error) {
        console.log(error);
        sendError(res, error);
    };
});

export default chatRoute;