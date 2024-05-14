import express from 'express'
import { verifyStaff, verifyToken, rateLimitAPI } from '../middleware/index.js'
import { SOCKET_URL } from '../constant.js';
import { io } from 'socket.io-client';
import { EVENT } from '../constant.js';
import { sendError, sendServerError, sendSuccess, sendAutoMail, sendAutoSMS } from '../helper/client.js';
import jwt from 'jsonwebtoken'


const prRoute = express.Router()


// User data to include in the token payload
const adminFlaskAPI = {
    name: 'admin',
    password: process.env.HALF_KEY_JWT_SERVER_FLASK.slice(0, 19)
};

// Generate a JWT token with the user data and secret key
const token = jwt.sign(adminFlaskAPI, process.env.HALF_KEY_JWT_SERVER_FLASK, { expiresIn: '1h' });

console.log('Generated Token:', token);



/**
 * @route GET /api/v1/parse-recruiter/
 * @description get api ai parse recruiter
 * @access private
 */


const pyIo = io(SOCKET_URL + EVENT.parseRecruiter, {
    reconnection: true, extraHeaders: {
        "Authorization": `Bearer ${token}` // Use standard authorization header
    }, transports: ['websocket', 'polling']
});

prRoute.post('/', rateLimitAPI, verifyToken, async (req, res) => {
    try {
        
        pyIo.emit('json', { 'msg': 'jsontest' });
        // Wait for the 'json' event response from the server
        const data = await new Promise((resolve, reject) => {
            pyIo.once('json', data => resolve(data));
            pyIo.once('error', error => reject(error))
        })
        console.log("my res - from python server: " + data);
        return sendSuccess(res, 'success', data);
    } catch (error) {
        console.log(error);
        sendError(res, error);
    }
});


export default prRoute;