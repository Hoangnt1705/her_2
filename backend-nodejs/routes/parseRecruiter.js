import express from 'express';
import { verifyStaff, verifyToken } from '../middleware/index.js';
import { pyIo } from '../socket/handle.js';
const prRoute = express.Router()


/**
 * @route GET /api/v1/parse-recruiter/
 * @description get api ai parse recruiter
 * @access private
 */
prRoute.get('/', verifyToken, async (req, res) => {
    console.log(req.verifyToken)
    pyIo.on('my response', function (data) {
        console.log("my res - from python server: " + data);
    });
    pyIo.emit('json', { 'msg': req.verifyToken });
    return res.json({status: 200});
});


export default prRoute;