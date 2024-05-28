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



const prRoute = express.Router()

// User data to include in the token payload
const adminFlaskAPI = {
    name: 'admin',
    password: process.env.HALF_KEY_JWT_SERVER_FLASK.slice(0, 19)
};

// Generate a JWT token with the user data and secret key

let tokenFlaskAPI = jwt.sign(adminFlaskAPI, process.env.HALF_KEY_JWT_SERVER_FLASK);

let pyIo = io(SOCKET_URL + EVENT.parseRecruiter, {
    reconnection: true, extraHeaders: {
        "Authorization": `Bearer ${tokenFlaskAPI}` // Use standard authorization header
    }, transports: ['websocket', 'polling']
});

/**
 * @route POST /api/v1/parse-recruiter/
 * @description get api ai parse recruiter, store data, and return id data 
 * @access private
 */

prRoute.post('/', rateLimitAPI, verifyToken, async (req, res) => {
    try {
        let { data, cid } = req.body;
        console.log('cid', cid)
        // get redis client
        const { instanceConnect: redisClient } = await getRedis();

        data = data.trim();

        if (!data) return sendError(res, 'Data in missing');

        let resFlask;

        // Check if the data exists in the cache
        const cachedResult = await redisClient.get(data);
        if (cachedResult) {
            resFlask = JSON.parse(cachedResult);
        }
        else {
            pyIo.emit('json', {
                'msg': data.trim()
            });
            // Wait for the 'json' event response from the server

            resFlask = await new Promise((resolve, reject) => {
                pyIo.once('json', data => resolve(data));
                pyIo.once('error', error => reject(error))
            });
            // Cache the result for future requests
            redisClient.set(data, JSON.stringify(resFlask), { EX: 3600 });
        };
        let chat;
        if (!cid) {
            chat = await ParseRecruiterChat.create({
                title: resFlask.data?.title ? resFlask.data.title : 'error',
                user: req.user.id,
            });
        };

        const document = await ParseRecruiterDocument.create({
            sender: data,
            receiver: resFlask,
            chat: cid ? cid : chat._id,

        });

        return sendSuccess(res, cachedResult ? 'Data retrieved from cache.' : 'Data processed successfully',
            { result: cid ? document : chat });
    } catch (error) {
        console.log(error);
        sendError(res, error);
    }
});


/**
 * @route GET /api/v1/parse-recruiter/document
 * @description get data parse recruiter by id
 * @access private
 */

prRoute.get('/document/:cid', async (req, res) => {
    try {
        const { cid } = req.params;
        const document = await ParseRecruiterDocument.find({ chat: { $ne: null, $eq: cid } }).populate({
            path: 'chat',
            model: ParseRecruiterChat
        }).sort({ updatedAt: -1 });

        return sendSuccess(res, 'okee', { result: document })

    } catch (error) {
        console.log(error);
        sendError(res, error);
    };
});



export default prRoute;