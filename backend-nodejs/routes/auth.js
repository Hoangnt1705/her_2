import dotenv from 'dotenv';
dotenv.config();
import express from 'express'
import bcrypt from 'bcrypt';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import { OAuth2Client } from 'google-auth-library';
import Customer from '../model/Customer.js'
import User from '../model/User.js'
import _ from 'lodash';
import { verifyToken } from '../middleware/index.js';

import { clearTokenList } from '../service/jwt.js';
import {printIn} from '../service/consoleLog.js';
import { TOKEN_BLACKLIST, TOKEN_LIST } from "../index.js"
import { sendError, sendServerError, sendSuccess, sendAutoMail, sendAutoSMS } from '../helper/client.js'
import { JWT_EXPIRED, JWT_REFRESH_EXPIRED, VERIFY_OP } from '../constant.js'
import { genarateOTP } from '../service/otp.js'
import { renewPw } from '../service/password.js'
import {
    customerRegisterValidate, userVerifyOTP, userLoginValidate,
    userForgotPw, userChangePw
} from '../validation/auth.js'

const jobBoardAPIKey = process.env.JOB_BOARD_API_KEY;
const openAIAPIKey = process.env.OPENAI_API_KEY;

var authRoute = express.Router();


/**
 * @route POST /api/auth/login
 * @description login user
 * @access public
 */
authRoute.post('/login', async (req, res) => {
    const token = req.body.idToken;
    if (!token) return sendError(res, 'Required valid token');

    const client = new OAuth2Client();
    try {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.OAUTH_GOOGLE_KEY,  // Specify the CLIENT_ID of the app that accesses the backend
            // Or, if multiple clients access the backend:
            //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
        });

        const payload = ticket.getPayload();
        // const userId = payload.sub;
        const email = payload.email;
        // If request specified a G Suite domain:
        // const domain = payload['hd'];

        if (!email) throw new Error('You must provide a email')
        if (!payload.email_verified) throw new Error('You must verify email address')
        let user = await User.findOne({
            email: { $ne: null, $eq: email },
            isActive: true
        }).populate({ path: 'role', model: Customer })
        //if existed on db
        if (!user) {
            // if not existing will create customer 
            const customer = await Customer.create({
                name: payload.name,
                avatarUrl: payload.picture,
                google: { locale: 'en' }
            });

            user = await User.create({
                email: email,
                role: customer._id,
                isActive: true
            })
        }
        else if (!user.role) return sendError(res, 'your role is not valid. access denied.', 403)
        else {
            // update the user with latest google profile info
            await User.findByIdAndUpdate(user._id, {
                email: email
            })
            await Customer.findByIdAndUpdate(user.role, {
                name: payload.name,
                avatarUrl: payload.picture,
                google: { locale: 'en' }
            });
            // save the info and resolve the user doc
        };
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
        });

    } catch (error) {
        console.log(error)
        return sendServerError(res)
    }
});

/**
 * @route POST /api/auth/verify-token
 * @description verify user with access token
 * @access public
 */
authRoute.post('/verify-token', (req, res) => {
    const { accessToken, refreshToken } = req.body

    try {
        // kiểm tra accessToken có trong TOKEN_LIST? Để đảm bảo rằng hacker sẽ không lấy refresh token trong TOKEN_LIST để truy cập trái phép
        if (accessToken in TOKEN_LIST || accessToken in TOKEN_BLACKLIST) return sendError(res, "Unauthorzied.", 401)
        // kiểm tra xem access token người gửi có xác thực được không, nếu token vẫn hoạt động bình thường hoặc không hết hạn
        // sẽ gửi data về tiếp cho khách hàng
        const { payload } = jwt.verify(accessToken, process.env.JWT_SECRET_KEY, {
            complete: true
        })
        return sendSuccess(res, "Verify token successfully.", {
            user: payload.user
        })
    }
    catch (error) {
        console.log(TOKEN_LIST[refreshToken].accessToken)
        // nếu accesstoken khách hàng bị lỗi sẽ kiểm tra xem khách hàng có tác động xấu vào token không,
        // check refresh token nếu tồn tại trong hệ thống sẽ lấy access token từ refresh token, nếu xác thực thành công
        // sẽ trả về lỗi bởi vì token khách hàng gửi lên sai mà check trong server thì lại true

        if (refreshToken && refreshToken in TOKEN_LIST) {
            try {
                jwt.verify(TOKEN_LIST[refreshToken].accessToken, process.env.JWT_SECRET_KEY, {
                    complete: true
                })
                return sendError(res, "Unauthorzied.", 401)
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
                    return sendError(res, "Unauthorzied.", 401)
                }
            }
        }
        else {
            // console.log('access-token is expired.')
            return sendError(res, "Unauthorzied.", 401)
        }
    }
})

/**
 * @route POST /api/auth/logout
 * @description user log out
 * @access private
 */
authRoute.post('/logout', verifyToken, async (req, res) => {
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
    } catch (error) {
        console.log(error);
    }
    return sendSuccess(res, 'log out successfully. see you soon.')
})

export default authRoute;

// Google
// authRoute.get('/google',
//     passport.authenticate('google', {
//         scope: ['email', 'profile'
//             // 'https://www.googleapis.com/auth/user.birthday.read', 'https://www.googleapis.com/auth/user.gender.read'
//         ]
//     }));

// authRoute.get('/profile', ensureAuthenticated, (req, res) => {

//     res.send('profile');
// });

// authRoute.get('/google/callback',
//     passport.authenticate('google', { failureRedirect: '/api/auth/google' }),
//     function (req, res) {
//         // Successful authentication, redirect home.
//         res.redirect('/api/auth/login/success');
//     });

// authRoute.use('/login/success', (req, res) => {
//     if (req.user) {
//         console.log(req.isAuthenticated())
//         return res.json(req.user)
//     }
//     else return res.send('error')
// });





// authRoute.get('/logout', (req, res) => {
//     req.logout(error => {
//         if (error) return;
//         return res.redirect('/api/auth');
//     })
// });




// LinkedIn
// authRoute.get('/linkedin', passport.authenticate('linkedin', { state: 'LSFKDF' }));

// authRoute.get('/linkedin/callback', passport.authenticate('linkedin', {
//     successRedirect: '/api/auth/login/success',
//     failureRedirect: '/api/auth/linkedin'
// }));




//Facebook
// authRoute.get('/facebook',
//     passport.authenticate('facebook'));

// authRoute.get('/facebook/callback',
//     passport.authenticate('facebook', { failureRedirect: '/api/auth/facebook' }),
//     function (req, res) {
//         // Successful authentication, redirect home.
//         res.redirect('/api/auth/login/success');
//     });




