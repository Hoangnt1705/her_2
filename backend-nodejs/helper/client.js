import axios from 'axios'
import NodeMailer from 'nodemailer';

export const sendSuccess = (res, message, data = null) => {
    let responseJson = {
        success: true,
        message: message
    }
    if (data) responseJson.data = data
    return res.status(200).json(responseJson)
}

export const sendError = (res, message, code = 400) => {
    return res.status(code).json({
        success: false,
        message: message
    })
}

export const sendServerError = res =>
    res.status(500).json({
        success: false,
        message: 'Server Interval Error.'
    })

export const sendAutoSMS = async (options) => {
    const transport = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN, {
        lazyLoading: true
    })

    try {
        await transport.messages.create(options)
        return true
    } catch (error) {
        console.log(error)
        return false
    }
}

export const sendAutoMail = async (options) => {
    const transport = NodeMailer.createTransport({
        service: process.env.MAIL_SERVICE,
        auth: {
            type: 'OAuth2',
            user: process.env.MAIL_USERNAME,
            pass: process.env.MAIL_PASSWORD,
            clientId: process.env.MAIL_KEY,
            clientSecret: process.env.MAIL_SECRET,
            refreshToken: process.env.OAUTH_GOOGLE_REFRESH_TOKEN
        }
    })
    try {
        await transport.sendMail(options)
        return true
    } catch (error) {
        console.log(error)
        return false
    }
}

export class SendRedisError extends Error {
    constructor({ statusCode, message }) {
        super(message);
        this.statusCode = statusCode;
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }
}