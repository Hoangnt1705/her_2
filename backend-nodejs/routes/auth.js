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
import { TOKEN_BLACKLIST, TOKEN_LIST } from "../index.js"
import { sendError, sendServerError, sendSuccess, sendAutoMail, sendAutoSMS } from '../helper/client.js'
import { JWT_EXPIRED, JWT_REFRESH_EXPIRED, VERIFY_OP } from '../constant.js'
import { genarateOTP } from '../service/otp.js'
import { renewPw } from '../service/password.js'
import { printIn } from '../service/consoleLog.js';
import {
    customerRegisterValidate, userVerifyOTP, userLoginValidate,
    userForgotPw, userChangePw
} from '../validation/auth.js'
import '../service/passport.js';
const jobBoardAPIKey = process.env.JOB_BOARD_API_KEY;
const openAIAPIKey = process.env.OPENAI_API_KEY;

var authRoute = express.Router();


/**
 * @route POST /api/auth/login
 * @description login user
 * @access public
 */

// Google
authRoute.get('/google/login',
    passport.authenticate('google', {
        scope: ['email', 'profile'
            // 'https://www.googleapis.com/auth/user.birthday.read', 'https://www.googleapis.com/auth/user.gender.read'
        ]
    }));

authRoute.get('/google/callback',
    passport.authenticate('google', { failureRedirect: '/api/auth/google/login' }),
    (req, res) => {
        // if (req.user && req.isAuthenticated()) {
        //     res.redirect('http://localhost:5173/account/login');
        // } else {
        //     res.redirect('/api/auth/google/login');
        // }
        res.redirect('http://localhost:5173/account/login');
    });
authRoute.get('/login/success', (req, res) => {
    console.log(req.isAuthenticated(), req.user)
    try {
        if (req.isAuthenticated() && req.user) {
            return sendSuccess(res, req.user.message, {
                accessToken: req.user.accessToken,
                refreshToken: req.user.refreshToken,
                user: req.user.user
            });
        } else {
            return sendError(res, req.user?.message || 'Access denied', req.user?.code || 403);
        }
    } catch (error) {
        console.log(error);
    }

});

// LinkedIn
authRoute.get('/linkedin/login',
    passport.authenticate('linkedin', { state: 'SOME STATE' }),
    function (req, res) {
        // The request will be redirected to LinkedIn for authentication, so this
        // function will not be called.
    });

authRoute.get('/linkedin/callback', passport.authenticate('linkedin', {
    failureRedirect: '/api/auth/linkedin/login'
}),
    (req, res) => {
        // if (req.user && req.isAuthenticated()) {
        //     res.redirect('http://localhost:5173/account/login');
        // } else {
        //     res.redirect('/api/auth/google/login');
        // }
        res.redirect('http://localhost:5173/account/login');
    });

//Facebook
authRoute.get('/facebook/login',
    passport.authenticate('facebook', { scope: ['email'] }));

authRoute.get('/facebook/callback',
    passport.authenticate('facebook', { failureRedirect: '/api/auth/facebook/login' }),
    function (req, res) {
        // Successful authentication, redirect home.
        res.redirect('http://localhost:5173/account/login');
    });

/**
 * @route POST /api/auth/verify-token
 * @description verify user with access token
 * @access public
 */
authRoute.post('/verify-token', (req, res) => {
    const { accessToken, refreshToken } = req.body;

    try {
        // kiểm tra accessToken có trong TOKEN_LIST? Để đảm bảo rằng hacker sẽ không lấy refresh token trong TOKEN_LIST để truy cập trái phép
        if (accessToken in TOKEN_LIST || accessToken in TOKEN_BLACKLIST) {
            return sendError(res, "Unauthorzied.", 401)

        }
        // kiểm tra xem access token người gửi có xác thực được không, nếu token vẫn hoạt động bình thường hoặc không hết hạn
        // sẽ gửi data về tiếp cho khách hàng
        const { payload } = jwt.verify(accessToken, process.env.JWT_SECRET_KEY, {
            complete: true
        })
        return sendSuccess(res, "Verify token successfully.", {
            user: payload.user
        });

    }
    catch (error) {
        // nếu accesstoken khách hàng bị lỗi sẽ kiểm tra xem khách hàng có tác động xấu vào token không,
        // check refresh token nếu tồn tại trong hệ thống sẽ lấy access token từ refresh token, nếu xác thực thành công
        // sẽ trả về lỗi bởi vì token khách hàng gửi lên sai mà check trong server thì lại true
        if (refreshToken && refreshToken in TOKEN_LIST) {
            printIn('TOKEN_LIST2')
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
            printIn('access-token is expired.')
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
    const { refreshToken } = req.body;
    if (refreshToken in TOKEN_LIST)
        delete TOKEN_LIST[refreshToken]
    else return oAuthLogout(req, res);
    try {
        jwt.verify(req.verifyToken, process.env.JWT_SECRET_KEY, {
            complete: true
        });
        TOKEN_BLACKLIST[req.verifyToken] = req.verifyToken;
        clearTokenList(TOKEN_BLACKLIST);
    } catch (error) {
        console.log(error);
        return sendError(res, "Unauthorzied.", 401);
    }
    return oAuthLogout(req, res);
});

/**
 * @route POST /api/auth/o-auth/logout
 * @description user log out oauth data
 * @access public
 */
authRoute.post('/o-auth/logout', (req, res) => {
    return oAuthLogout(req, res);
})

const oAuthLogout = (req, res) => {
    return req.logout((err) => {
        if (err) {
            console.log("error: " + err);
            return sendError(res, "Error logging out", 500);
        }
        console.log("destroying session in logout");
        req.session.destroy((err) => {
            if (err) {
                console.log("error: " + err);
                return sendError(res, "Error destroying session", 500);
            }
            // Clear the cookie
            res.clearCookie('connect.sid', { path: '/' }); // Ensure the path matches the cookie's path
            return sendSuccess(res, "Logged out successfully.")

        });
    });
}

//remove
// authRoute.get('/oauth/logout', (req, res) => {
//     console.log("logging out, user:" + req.user);
//     req.logout((err) => {
//         if (err) {
//             console.log("error: " + err);
//             return sendError(res, "Error logging out", 500);
//         }
//         console.log("destroying session in logout");
//         req.session.destroy((err) => {
//             if (err) {
//                 console.log("error: " + err);
//                 return sendError(res, "Error destroying session", 500);
//             }
//             // Clear the cookie
//             res.clearCookie('connect.sid', { path: '/' }); // Ensure the path matches the cookie's path
//             return sendSuccess(res, "Logged out successfully.")

//         });
//     });
// });


export default authRoute;


// authRoute.get('/profile', ensureAuthenticated, (req, res) => {

//     res.send('profile');
// });

// authRoute.get('/logout', (req, res) => {
//     req.logout(error => {
//         if (error) return;
//         return res.redirect('/api/auth');
//     })
// });




// authRoute.post('/login', async (req, res) => {
//     const token = req.body.idToken;
//     if (!token) return sendError(res, 'Required valid token');

//     const client = new OAuth2Client();
//     try {
//         const ticket = await client.verifyIdToken({
//             idToken: token,
//             audience: process.env.OAUTH_GOOGLE_KEY,  // Specify the CLIENT_ID of the app that accesses the backend
//             // Or, if multiple clients access the backend:
//             //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
//         });

//         const payload = ticket.getPayload();
//         // const userId = payload.sub;
//         const email = payload.email;
//         // If request specified a G Suite domain:
//         // const domain = payload['hd'];

//         if (!email) throw new Error('You must provide a email')
//         if (!payload.email_verified) throw new Error('You must verify email address')
//         let user = await User.findOne({
//             email: { $ne: null, $eq: email },
//             isActive: true
//         }).populate({ path: 'role', model: Customer })
//         //if existed on db
//         if (!user) {
//             // if not existing will create customer 
//             const customer = await Customer.create({
//                 name: payload.name,
//                 avatarUrl: payload.picture,
//                 google: { locale: 'en' }
//             });

//             user = await User.create({
//                 email: email,
//                 role: customer._id,
//                 isActive: true
//             })
//         }
//         else if (!user.role) return sendError(res, 'your role is not valid. access denied.', 403)
//         else {
//             // update the user with latest google profile info
//             await User.findByIdAndUpdate(user._id, {
//                 email: email
//             })
//             await Customer.findByIdAndUpdate(user.role, {
//                 name: payload.name,
//                 avatarUrl: payload.picture,
//                 google: { locale: 'en' }
//             });
//             // save the info and resolve the user doc
//         };
//         const userData = {
//             id: user._id,
//             email: user.email,
//             phone: user.phone,
//             address: user.role.address,
//             role: user.role
//         }
//         const accessToken = jwt.sign(
//             {
//                 user: userData
//             },
//             process.env.JWT_SECRET_KEY,
//             {
//                 expiresIn: JWT_EXPIRED
//             }
//         )

//         const refreshToken = jwt.sign(
//             {
//                 user: userData
//             },
//             process.env.JWT_REFRESH_SECRET_KEY,
//             {
//                 expiresIn: JWT_REFRESH_EXPIRED
//             }
//         )

//         const response = {
//             accessToken,
//             refreshToken
//         }

//         TOKEN_LIST[refreshToken] = response

//         return sendSuccess(res, 'Login successfully.', {
//             accessToken,
//             refreshToken,
//             user: userData
//         });

//     } catch (error) {
//         console.log(error)
//         return sendServerError(res)
//     }
// });
