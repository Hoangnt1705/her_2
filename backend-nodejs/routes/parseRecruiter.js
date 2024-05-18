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
let tokenFlaskAPI;
if (!tokenFlaskAPI) {
    tokenFlaskAPI = jwt.sign(adminFlaskAPI, process.env.HALF_KEY_JWT_SERVER_FLASK, { expiresIn: '2h' });
}
setInterval(() => {
    tokenFlaskAPI = jwt.sign(adminFlaskAPI, process.env.HALF_KEY_JWT_SERVER_FLASK, { expiresIn: '2h' });
}, 7200000);

const pyIo = io(SOCKET_URL + EVENT.parseRecruiter, {
    reconnection: true, extraHeaders: {
        "Authorization": `Bearer ${tokenFlaskAPI}` // Use standard authorization header
    }, transports: ['websocket', 'polling']
});

/**
 * @route POST /api/v1/parse-recruiter/
 * @description get api ai parse recruiter
 * @access private
 */

prRoute.post('/', rateLimitAPI, verifyToken, async (req, res) => {
    try {
        let { data } = req.body;

        // get redis client
        const { instanceConnect: redisClient } = await getRedis();

        printIn(req.user)
        printIn(data)
        data = data.trim();

        if (!data) return sendError(res, 'Data in missing')

        // Check if the data exists in the cache
        const cachedResult = await redisClient.get(data);
        if (cachedResult) {
            return sendSuccess(res, 'Data retrieved from cache.', { result: JSON.parse(cachedResult) });
        }
        else {
            pyIo.emit('json', {
                'msg': data.trim()
            });
            // Wait for the 'json' event response from the server

            const resFlask = await new Promise((resolve, reject) => {
                pyIo.once('json', data => resolve(data));
                pyIo.once('error', error => reject(error))
            });
            // Cache the result for future requests
            redisClient.set(data, JSON.stringify(resFlask), { EX: 3600 });

            return sendSuccess(res, 'Data processed successfully', { result: resFlask });
            // return sendSuccess(res, 'Data processed successfully', { result: 'Test' });

        }
    } catch (error) {
        console.log(error);
        sendError(res, error);
    }
});

/**
 * @route POST /api/v1/parse-recruiter/store-data-parse-recruiter
 * @description post data parse recruiter after get data AI to /api/v1/parse-recruiter
 * @access private
 */

prRoute.post('/store-data-parse-recruiter', verifyToken, async (req, res) => {
    try {
        const chat = await ParseRecruiterChat.create({
            title: 'hello',
            user: req.user.id
        });

        const document = await ParseRecruiterDocument.create({
            sender: data,
            receiver: resFlask,
            chat: chat._id,

        });
        return sendSuccess(res, 'Create new data pr successfully', { chat, document })
    } catch (error) {
        console.log(error);
        sendError(res, error);
    };
});

export default prRoute;