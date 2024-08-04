import { io } from 'socket.io-client';
import { EVENT, SOCKET_URL } from '../constant.js';
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';
dotenv.config();
// User data to include in the token payload
const adminFlaskAPI = {
    name: 'admin',
    password: process.env.HALF_KEY_JWT_SERVER_FLASK.slice(0, 19)
  };
  
  // Generate a JWT token with the user data and secret key
  let tokenFlaskAPI = jwt.sign(adminFlaskAPI, process.env.HALF_KEY_JWT_SERVER_FLASK);

 export const pySocket = io(SOCKET_URL + EVENT.connect, {
    reconnection: true,
    extraHeaders: {
      "Authorization": `Bearer ${tokenFlaskAPI}` // Use standard authorization header
    },
    transports: ['websocket', 'polling']
  });

