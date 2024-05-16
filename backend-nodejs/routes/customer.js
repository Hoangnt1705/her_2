import express from 'express';
import Customer from '../model/Customer.js';
import {printIn} from '../service/consoleLog.js';
import { sendError, sendServerError, sendSuccess } from '../helper/client.js';

const customerRoute = express.Router();

/**
 * @route GET/api/customer/
 * @description get all customers, get a customer byy id, sort by name and search by keyword
 * @access public
 */
customerRoute.get('/', async (req, res) => {
    const id = req.query.id ? req.query.id : null;
    const keyword = req.query.keyword ? req.query.keyword : null;
    const sort = req.query.sort || 1;
    let query = {};
    if (id) query = { _id: id }
    else if (keyword) {
        query = {
            $or: [
                {
                    name: { $regex: keyword, $options: '$i' }
                }, {
                    address: { $regex: keyword, $options: '$i' }
                }, {
                    description: { $regex: keyword, $options: 'i' }
                }
            ]
        }
    }

    try {
        const result = await Customer.find(query).sort({ name: sort })
        if (result) return sendSuccess(res, 'Get customers successfully', result)
        return sendError(res, 'No information found.');
    }
    catch (error) {
        sendServerError(error)
    };
})

export default customerRoute;

