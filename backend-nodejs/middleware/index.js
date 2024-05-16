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
        const data = req.headers['authorization']
        const token = data?.split(" ")[1];
        if (!token) return sendError(res, 'jwt must be provided.', 401)

        if (token in TOKEN_LIST || token in TOKEN_BLACKLIST)
            return sendError(res, "Unauthorized.", 401)

        const { payload } = jwt.verify(token, process.env.JWT_SECRET_KEY, {
            complete: true
        })

        if (!payload.user) return sendError(res, "Unauthorized.", 401)

        req.verifyToken = token
        req.user = payload.user
        next()

    } catch (error) {
        return sendError(res, 'jwt expired.', 401)
    }
}


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
