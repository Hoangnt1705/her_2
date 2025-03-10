import dotenv from "dotenv"
dotenv.config();
import fs from 'fs'; import createError from 'http-errors';
import express from 'express';
import path from 'path';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser'
import logger from 'morgan';
import YAML from 'yamljs'
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import passport from "passport";
import session from 'express-session';
import axios from 'axios';

import authRoute from './routes/auth.js'; // Assuming this is the correct route for authentication
import adminRoute from "./routes/admin/index.js";
import userRoute from "./routes/user.js";
import resumeTemplate from "./routes/resumeTemplate.js";
import parseRecruiter from './routes/parseRecruiter.js';
import resumeAIRoute from './routes/resumeAI.js';
import chatAndConversation from './routes/chatAndConversation.js';
import { verifyToken } from './middleware/index.js';
import { initRedis, getRedis } from "./db/index.js";

import RedisStore from "connect-redis"

// swagger setup
import swaggerUi from 'swagger-ui-express'
import { SESSION_AGE } from "./constant.js";
// import { addSocketSession, handleDisconnect } from "./socket/handle.js"
const swaggerDocument = YAML.load('./swagger.yaml')


const jobBoardAPIKey = process.env.JOB_BOARD_API_KEY;
const linkedInAPIKey = process.env.LINKEDIN_API_KEY;
const openAIAPIKey = process.env.OPENAI_API_KEY;
export const TOKEN_LIST = {}
export const TOKEN_BLACKLIST = {}
export const SOCKET_SESSIONS = []


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express()


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


//redis
initRedis();
const { instanceConnect: redisClient } = await getRedis();


const whitelist = ['http://localhost:5173', 'http://localhost:5000']; // Whitelist your allowed origins

const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
};

app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


// app.use(function (req, res, next) {
//   if (req.method === 'GET' && (req.url === '/api/auth/login' || req.url === '/api/auth/login/success')) {
//     req.session.cookie.maxAge = 7 * 24 * 60 * 60 * 1000; // 7*24*60*60*1000 Rememeber 'me' for 30 days
//   }
//   else {
//     req.session.cookie.maxAge = SESSION_AGE;
//   }
//   next();
// });
// const store = new session.MemoryStore()
app.use(
  session({
    store: new RedisStore({ client: redisClient }),
    secret: process.env.SESSION_SECRET || 'your-secret', // Replace with an environment variable
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === 'production', // Ensure cookies are sent over HTTPS in production
      httpOnly: true, // Prevent client-side JavaScript from accessing the cookie
      maxAge: 1000 * 60 * 60 * 24, // Cookie expiration (e.g., 1 day)
      // sameSite: "none", //Enable when deployment OR when not using localhost, We're not on the same site, we're using different site so the cookie need to effectively transfer from Backend to Frontend

    }
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
  .use('/api/admin', adminRoute)
  .use('/api/auth', authRoute)
  .use('/api/user', userRoute)
  .use('/api/v1/parse-recruiter', parseRecruiter)
  .use('/api/v1/chat-and-conversation', chatAndConversation)
  .use('/api/v1/resume-ai', resumeAIRoute)
  .use('/api/v1/resume-template', resumeTemplate)
app.use('/*', async (req, res) => {
  res.status(501).send("Don't implement.")
})
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


export default app;
