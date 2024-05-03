import express from 'express'
import { verifyStaff, verifyToken } from '../middleware/index.js'
import { SOCKET_URL } from '../constant.js';
import { io } from 'socket.io-client';
import { EVENT } from '../constant.js';
const prRoute = express.Router()


/**
 * @route GET /api/v1/parse-recruiter/
 * @description get api ai parse recruiter
 * @access private
 */
prRoute.get('/', verifyToken, async (req, res) => {
    const pyIo = io(SOCKET_URL + EVENT.parseRecruiter, { reconnection: true, transports: ['websocket', 'polling'] });

    // pyIo.on('my response', function (data) {
    //     console.log("my res - from python server: " + data);
    // });
    // pyIo.emit('json', { 'msg': 'jsontest' });
    return res.json({ status: 200, data: req.verifyToken })
});


export default prRoute;