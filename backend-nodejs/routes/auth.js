import express from 'express'
import bcrypt from 'bcrypt';
import passport from 'passport';
import { ensureAuthenticated } from '../middleware/index.js';
// import jwt from 'jsonwebtoken';

// import Customer from '../model/Customer.js'
// import User from '../model/User.js'
// import { verifyToken } from '../middleware/index.js';

// import { clearTokenList } from '../service/jwt.js';
// import { TOKEN_BLACKLIST, TOKEN_LIST } from "../index.js"
// import { sendError, sendServerError, sendSuccess, sendAutoMail, sendAutoSMS } from '../helper/client.js'
// import { JWT_EXPIRED, JWT_REFRESH_EXPIRED, VERIFY_OP } from '../constant.js'
// import { genarateOTP } from '../service/otp.js'
// import { renewPw } from '../service/password.js'
// import {
//     customerRegisterValidate, userVerifyOTP, userLoginValidate,
//     userForgotPw, userChangePw
// } from '../validation/auth.js'

const jobBoardAPIKey = process.env.JOB_BOARD_API_KEY;
const openAIAPIKey = process.env.OPENAI_API_KEY;

var authRoute = express.Router();

authRoute.get('/', (req, res) => {
    res.send(`<center style="font-size:160%"> <p>This is Home Page </p>
    <p>User is not Logged In</p>
    <img style="cursor:pointer;"  onclick="window.location='/api/auth/linkedin'" src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/LinkedIn_Logo.svg/1280px-LinkedIn_Logo.svg.png"/>
    </center>
    `);
});

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


// Google
authRoute.get('/google',
    passport.authenticate('google', {
        scope: ['email', 'profile'
            // 'https://www.googleapis.com/auth/user.birthday.read', 'https://www.googleapis.com/auth/user.gender.read'
        ]
    }));

authRoute.get('/profile', ensureAuthenticated, (req, res) => {
    
    res.send('profile');
});

authRoute.get('/google/callback',
    passport.authenticate('google', { failureRedirect: '/api/auth/google' }),
    function (req, res) {
        // Successful authentication, redirect home.
        res.redirect('/api/auth/login/success');
    });

authRoute.use('/login/success', (req, res) => {
    if (req.user) {
        console.log(req.isAuthenticated())
        return res.json(req.user)
    }
    else return res.send('error')
});


authRoute.get('/logout', (req, res) => {
    req.logout(error => {
        if (error) return;
        return res.redirect('/api/auth');
    })
});



export default authRoute
