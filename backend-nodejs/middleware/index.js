import jwt from 'jsonwebtoken'
import { sendError, sendServerError } from '../helper/client.js'
import { TOKEN_LIST, TOKEN_BLACKLIST } from '../index.js'
import { incr, expire, timeToLive } from '../service/redis.js';
import {printIn} from '../service/consoleLog.js';

/**
 * API rate limit 
 * if development environment not limit, if production 50 request on two hours
 */

export const rateLimitAPI = async (req, res, next) => {
    try {
        const getIpUser = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
        const numberReq = await incr(getIpUser);
        let ttl = 0;
        if (numberReq === 1) {
            await expire(getIpUser, 60);
        }
        else {
            ttl = await timeToLive(getIpUser);
        }
        if (numberReq >= 20) {
            return sendError(res, 'Forbidden!', 403);
        }
        req.limit = {
            getIpUser,
            numberReq,
            ttl,
            data: {
                success: 'okk',
            }
        }
        next();
    } catch (error) {
        console.log(error);
        sendServerError(res);
    }
}


/**
 * header contain
 * Authorised : Bearer token
 */

export const verifyToken = async (req, res, next) => {
    try {
        const data = req.headers['authorization'];
        const token = data?.split(" ")[1];

        // Check if token is present
        if (!token) return sendError(res, 'JWT must be provided.', 401);

        // Check if token is in the blacklist or not in the valid list
        if (token in TOKEN_LIST || token in TOKEN_BLACKLIST) {
            return sendError(res, "Unauthorized.", 401);
        }

        // Verify the token
        const { payload } = jwt.verify(token, process.env.JWT_SECRET_KEY, {
            complete: true,
        });

        // Check if user exists in payload
        if (!payload.user) return sendError(res, "Unauthorized.", 401);

        req.verifyToken = token;
        req.user = payload.user;
        next();

    } catch (error) {
        // Check for specific error types
        if (error.name === 'TokenExpiredError') {
            console.log('Token expired at:', error.name, '....', error.expiredAt);
            return sendError(res, 'JWT expired.', 401);
        } else if (error.name === 'JsonWebTokenError') {
            return sendError(res, 'Invalid JWT.', 401);
        } else if (error.name === 'NotBeforeError') {
            return sendError(res, 'JWT not active.', 401);
        }
        // Log and handle other errors
        console.log('Token verification error:', error);
        return sendError(res, 'Authorization failed.', 401);
    }
};


export const verifyAdmin = async (req, res, next) => {
    if (req.user.role.staff_type !== 'admin')
        return sendError(res, 'Forbidden.', 403)
    next()
}

export const verifyStaff = async (req, res, next) => {
    if (!req.user.role.hasOwnProperty('staff_type'))
        return sendError(res, 'Forbidden.', 403)
    next()
}

// export const verifyCustomer = async (req, res, next) => {
//     if (!req.user.role.hasOwnProperty('customer_type'))
//         return sendError(res, 'Forbidden.', 403)
//     next()
// }

export const verifyCustomerOrAdmin = async (req, res, next) => {
    if (req.user.role.staff_type !== 'admin' && (!req.user.role.hasOwnProperty('customer_type')))
        return sendError(res, 'Forbidden.', 403)
    next()
}

// export const ensureAuthenticated = (req, res, next) => {
//     if (req.isAuthenticated()) { return next(); }
//     res.redirect('/login')
//   }
