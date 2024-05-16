import express from 'express'
import { sendError, sendServerError, sendSuccess } from '../helper/client.js'
import { verifyStaff, verifyToken } from '../middleware/index.js'
import {printIn} from '../service/consoleLog.js';
import Customer from '../model/Customer.js'
import Staff from '../model/Staff.js'
import User from '../model/User.js'

const userRoute = express.Router()

/**
 * @route PUT /api/user/customer
 * @description update personnal customer information
 * @access private
 */
userRoute.put('/customer', verifyToken, async (req, res) => {
    const user = req.user
    const { name, email, phone, address, description } = req.body

    try {
        const [isExistedEmail, isExistedPhone] = await Promise.all([
            User.exists({ email }),
            User.exists({ phone })
        ])
        if (isExistedEmail || isExistedPhone)
            return sendError(res, "Email/Phone is used.")
        if (!name && !email && !phone) {
            return sendError(res, "Update account information false.");
        }

        await Promise.all([
            User.findByIdAndUpdate(user.id, { email, phone }),
            Customer.findByIdAndUpdate(user.role, { name, address, description })
        ])
        return sendSuccess(res, "Update user's information successfully.")
    } catch (error) {
        console.log(error)
        return sendServerError(res)
    }
})


/**
 * @route PUT /api/user/staff
 * @description update personnal staff information
 * @access private
 */
userRoute.put('/staff', verifyToken, verifyStaff, async (req, res) => {
    const user = req.user
    const { name, email, phone } = req.body

    if (!name && !email && !phone)
    return sendError(res, "Update staff failed.");

    try {
        const [isExistedEmail, isExistedPhone] = await Promise.all([
            User.exists({ email }),
            User.exists({ phone }),
        ])
        if (isExistedEmail || isExistedPhone)
            return sendError(res, "Email/Phone is used.")
       
        await Promise.all([
            User.findByIdAndUpdate(user.id, { email, phone }),
            Staff.findByIdAndUpdate(user.role, { name })
        ])
        return sendSuccess(res, "Update user's information successfully.")
    } catch (error) {
        console.log(error)
        return sendServerError(res)
    }
})

export default userRoute