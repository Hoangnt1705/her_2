import express from 'express'
import bcrypt from 'bcrypt';
import Staff from '../../model/Staff.js'
import User from '../../model/User.js'
import jwt from 'jsonwebtoken';


import { verifyToken } from '../../middleware/index.js';

import { clearTokenList } from '../../service/jwt.js';
import { TOKEN_BLACKLIST, TOKEN_LIST } from "../../index.js"
import { sendError, sendServerError, sendSuccess, sendAutoMail, sendAutoSMS } from '../../helper/client.js'
import { JWT_EXPIRED, JWT_REFRESH_EXPIRED, VERIFY_OP } from '../../constant.js'
import { genarateOTP } from '../../service/otp.js'
import { renewPw } from '../../service/password.js'
import {
    customerRegisterValidate, userVerifyOTP, userLoginValidate,
    userForgotPw, userChangePw, staffRegisterValidate
} from '../../validation/auth.js'
const authAdminRoute = express.Router()

/**
 * @route POST /api/admin/auth/verify-token
 * @description verify user with access token
 * @access public
 */
authAdminRoute.post('/verify-token', (req, res) => {
    const { accessToken, refreshToken } = req.body

    try {
        // kiểm tra accessToken có trong TOKEN_LIST? Để đảm bảo rằng hacker sẽ không lấy refresh token trong TOKEN_LIST để truy cập trái phép
        if (accessToken in TOKEN_LIST || accessToken in TOKEN_BLACKLIST) return sendError(res, "Unauthorzied.1", 401)
        const { payload } = jwt.verify(accessToken, process.env.JWT_SECRET_KEY, {
            complete: true
        })
        return sendSuccess(res, "Verify token successfully.1", {
            user: payload.user
        })
    }
    catch (error) {
        console.log(TOKEN_LIST[refreshToken].accessToken)
        if (refreshToken && refreshToken in TOKEN_LIST) {
            try {
                jwt.verify(TOKEN_LIST[refreshToken].accessToken, process.env.JWT_SECRET_KEY, {
                    complete: true
                })
                return sendError(res, "Unauthorzied.2", 401)
            }
            catch (error) {
                try {
                    const { payload } = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET_KEY, {
                        complete: true
                    })
                    const newAccessToken = jwt.sign(
                        {
                            user: payload.user
                        },
                        process.env.JWT_SECRET_KEY,
                        {
                            expiresIn: JWT_EXPIRED
                        }
                    )
                    TOKEN_LIST[refreshToken].accessToken = newAccessToken

                    return sendSuccess(res, "Verify token successfully.", {
                        accessToken: newAccessToken,
                        user: payload.user
                    })
                } catch (error) {
                    delete TOKEN_LIST[refreshToken]
                    return sendError(res, "Unauthorzied.3", 401)
                }
            }
        }
        else {
            // console.log('access-token is expired.')
            return sendError(res, "Unauthorzied.4", 401)
        }
    }
})


/**
 * @route POST /api/admin/auth/register
 * @description register staff account
 * @access private
 */

authAdminRoute.post('/register',
    async (req, res) => {
        const errors = staffRegisterValidate(req.body)
        if (errors)
            return sendError(res, errors)

        let { name, address, email, password, phone, staff_type, staff_position, verify_op } = req.body

        try {
            let isExist;
            if (email && phone) {
                isExist = await User.exists({ email }) || await User.exists({ phone });
            }
            else if (email) {
                isExist = await User.exists({ email });
            }
            else if (phone) {
                isExist = await User.exists({ phone });
            }
            else {
                return sendError(res, 'error creating');
            }
            if (isExist) return sendError(res, 'user already exists.')
            const otp = genarateOTP()

            if (verify_op === VERIFY_OP.email) {
                const options = {
                    from: process.env.MAIL_USERNAME,
                    to: email,
                    subject: '[noreply-Her Webapp] Xác thực email',
                    html: `<p>Nhập mã OTP để hoàn tất đăng ký: <i><b>${otp.value}</b></i></p>`
                }
                const sendMailSuccess = await sendAutoMail(options)
                if (!sendMailSuccess) return sendError(res, 'send OTP failed.')
            }
            else if (verify_op === VERIFY_OP.phone) {
                const options = {
                    from: process.env.PHONE_NUMBER,
                    to: phone,
                    body: `Nhập mã OTP để hoàn tất đăng ký: ${otp.value}`
                }
                const sendSMSSuccess = await sendAutoSMS(options)
                if (!sendSMSSuccess) return sendError(res, 'send OTP failed.')
            }

            const salt = await bcrypt.genSalt(10);
            password = await bcrypt.hash(password, salt)

            req.session.register = JSON.stringify({
                name, address, email, password, phone, staff_type, staff_position, verify_op, otp
            });
            return sendSuccess(res, 'send otp code successfully.')

        } catch (error) {
            console.log(error)
            return sendServerError(res)
        }
    }
);

/**
 * @route POST /api/admin/auth/verify-otp
 * @description Staff verify otp
 * @access public
 */

authAdminRoute.post('/verify-otp', async (req, res) => {
    const errors = userVerifyOTP(req.body)
    if (errors)
        return sendError(res, errors)

    try {
        if (!req.session.register)
            return sendError(res, 'Session error.', 404)
        const { name, address, email, password, phone, staff_type, staff_position, otp } = JSON.parse(req.session.register)
        if (req.body.otp !== otp.value || otp.expired < Date.now())
            return sendError(res, 'validate failed.')
        req.session.destroy('register')
        const newStaff = await Staff.create({
            name,
            address,
            staff_type,
            staff_position,
        })

        await User.create({
            name, email, password, phone, role: newStaff._id, isActive: true
        })
        return sendSuccess(res, 'user registered successfully.')
    } catch (error) {
        console.log(error.message)
        return sendServerError(res)
    }
});

/**
 * @route GET /api/admin/auth/update-otp
 * @description resend otp
 * @access public
 */

authAdminRoute.get('/update-otp', async (req, res) => {
    let { verify_op } = req.query

    if (!Object.values(VERIFY_OP).includes(verify_op))
        return sendError(res, 'verify option is invalid.', 404)

    try {
        if (!req.session.register)
            return sendError(res, 'Session error.', 404)
        const sessionStore = JSON.parse(req.session.register)
        const { email, phone } = sessionStore
        const otp = genarateOTP()

        if (verify_op === VERIFY_OP.email) {
            const options = {
                from: process.env.MAIL_USERNAME,
                to: email,
                subject: '[noreply-Her Webapp] Xác thực email',
                html: `<p>Nhập mã OTP để hoàn tất đăng ký: <i><b>${otp.value}</b></i></p>`
            }
            const sendMailSuccess = await sendAutoMail(options)
            if (!sendMailSuccess) return sendError(res, 'send OTP failed.')
        }
        else if (verify_op === VERIFY_OP.phone) {
            const options = {
                from: process.env.PHONE_NUMBER,
                to: phone,
                body: `Nhập mã OTP để hoàn tất đăng ký: ${otp.value}`
            }
            const sendSMSSuccess = await sendAutoSMS(options)
            if (!sendSMSSuccess) return sendError(res, 'send OTP failed.')
        }

        sessionStore.otp = otp
        req.session.register = JSON.stringify(sessionStore)

        return sendSuccess(res, 'update OTP successfully.')
    } catch (error) {
        console.log(error.message)
        return sendServerError(res)
    }
});


/**
* @route POST /api/admin/auth/login
 * @description Admin login
 * @access public
 */
authAdminRoute.post('/login', async (req, res) => {
    const errors = userLoginValidate(req.body)
    if (errors)
        return sendError(res, errors)

    let { email, phone, password } = req.body
    try {
        let user = await User.findOne({
            email: { $ne: null, $eq: email },
            isActive: true
        }).populate({ path: 'role', model: Staff })
        if (!user) {
            user = await User.findOne({
                phone: { $ne: null, $eq: phone },
                isActive: true
            }).populate({ path: 'role', model: Staff })
        }

        let success = true
        if (!user) success = false
        else if (!user.role)
            return sendError(res, 'your role is not valid. access denied.', 403)
        else {
            const passwordValid = await bcrypt.compare(password, user.password);
            if (!passwordValid) success = false
        }
        if (!success)
            return sendError(res, 'email/phone or password is wrong.')

        const userData = {
            id: user._id,
            email: user.email,
            phone: user.phone,
            address: user.role.address,
            role: user.role
        }
        const accessToken = jwt.sign(
            {
                user: userData
            },
            process.env.JWT_SECRET_KEY,
            {
                expiresIn: JWT_EXPIRED
            }
        )

        const refreshToken = jwt.sign(
            {
                user: userData
            },
            process.env.JWT_REFRESH_SECRET_KEY,
            {
                expiresIn: JWT_REFRESH_EXPIRED
            }
        )

        const response = {
            accessToken,
            refreshToken
        }

        TOKEN_LIST[refreshToken] = response

        return sendSuccess(res, 'Login successfully.', {
            accessToken,
            refreshToken,
            user: userData
        })
    } catch (error) {
        console.log(error)
        return sendServerError(res)
    }
})

/**
 * @route POST /api/admin/auth/forgot-pw
 * @description forgot password feature for staff
 * @access public
 */
authAdminRoute.post('/forgot-pw', async (req, res) => {
    const errors = userForgotPw(req.body)
    if (errors) return sendError(res, errors)

    let { email, phone } = req.body
    console.log(email)
    try {
        let user;
        if (email && phone) {
            user = await User.findOne({
                email: { $ne: null, $eq: email },
                phone: { $ne: null, $eq: phone },
                isActive: true
            })
        }
        else if (email) {
            user = await User.findOne({
                email: { $ne: null, $eq: email },
                isActive: true
            })
        }
        else {
            user = await User.findOne({
                phone: { $ne: null, $eq: phone },
                isActive: true
            })
        }
        if (!user) return sendError(res, 'email/phone doesn\'t exist.', 404)

        const newPw = await renewPw()
        if (email) {
            const options = {
                from: process.env.MAIL_HOST,
                to: email,
                subject: '[noreply-Logistics Webapp] Quên mật khẩu',
                html: `<p>Mật khẩu mới của bạn là: <i><b>${newPw}</b></i></p>`
            }
            const sendMailSuccess = await sendAutoMail(options)
            if (!sendMailSuccess) return sendError(res, 'send new password failed.')
        }
        else if (phone) {
            const options = {
                from: process.env.PHONE_NUMBER,
                to: phone,
                body: `Mật khẩu mới của bạn là: ${newPw}`
            }
            const sendSMSSuccess = await sendAutoSMS(options)
            if (!sendSMSSuccess) return sendError(res, 'send new password failed.')
        }
        const salt = await bcrypt.genSalt(10);
        const bcrypt_newPw = await bcrypt.hash(newPw, salt);
        await User.findByIdAndUpdate(user.id, { password: bcrypt_newPw })
        return sendSuccess(res, 'generate new password successfully.')
    } catch (error) {
        console.log(error)
        return sendServerError(res)
    }
});

/**
 * @route PUT /api/admin/auth/change-pw
 * @description user change current password
 * @access private
 */
authAdminRoute.put('/change-pw', verifyToken, async (req, res) => {
    const errors = userChangePw(req.body)
    if (errors) return sendError(res, errors)

    const { oldPw, newPw } = req.body
    try {
        const user = await User.findById(req.user.id)

        const pwValid = await bcrypt.compare(oldPw, user.password)
        if (!pwValid) return sendError(res, 'current password isn\'t correct.')

        const salt = await bcrypt.genSalt(10);
        const bcrypt_newPw = await bcrypt.hash(newPw, salt)
        await User.findByIdAndUpdate(req.user.id, { password: bcrypt_newPw })
        return sendSuccess(res, 'change your password successfully.')
    } catch (error) {
        console.log(error)
        return sendServerError(res)
    }
})


/**
 * @route POST /api/admin/auth/logout
 * @description user log out
 * @access private
 */
authAdminRoute.post('/logout', verifyToken, async (req, res) => {
    const { refreshToken } = req.body
    if (refreshToken in TOKEN_LIST)
        delete TOKEN_LIST[refreshToken]
    else return sendError(res, 'refresh token is invalid.', 401)
    try {
        jwt.verify(req.verifyToken, process.env.JWT_SECRET_KEY, {
            complete: true
        })
        TOKEN_BLACKLIST[req.verifyToken] = req.verifyToken
        clearTokenList(TOKEN_BLACKLIST)
    } catch (error) { }
    return sendSuccess(res, 'log out successfully. see you soon.')
})



export default authAdminRoute