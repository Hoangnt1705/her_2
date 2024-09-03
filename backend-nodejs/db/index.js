import dotenv from "dotenv"
dotenv.config();
import mongoose from "mongoose"
import { createClient } from "redis"
import { SendRedisError } from '../helper/client.js';
/**
 * Connect MongoDB
 */
mongoose.connect(process.env.MONGO_URI)
const db = mongoose.connection
db.on('error', () => console.log('MongoDB connection error.'))
db.once('open', () => {
  console.log('Connected to MongoDB successfully.')
})


// // connect redis
let client = {}, statusConnectRedis = {
  CONNECT: 'connect',
  END: 'end',
  RECONNECT: 'reconnecting',
  ERROR: 'error'
}, connectionTimeout

const REDIS_CONNECT_TIMEOUT = 10000, REDIS_CONNECT_MESSAGE = {
  code: -99,
  message: {
    en: 'Service connection error'
  }
};

const handleTimeoutError = () => {
  connectionTimeout = setTimeout(() => {

    throw new SendRedisError({
      statusCode: REDIS_CONNECT_MESSAGE.code,
      message: REDIS_CONNECT_MESSAGE.message.en
    })

  }, REDIS_CONNECT_TIMEOUT)
};
handleTimeoutError()

const handleEventConnect = ({ connectionRedis }) => {
  connectionRedis.on(statusConnectRedis.CONNECT, () => {
    console.log(`connectionRedis - Connection status: connected`)
    clearTimeout(connectionTimeout)
  });
  connectionRedis.on(statusConnectRedis.END, () => {
    console.log(`connectionRedis - Connection status: disconnected`)
    // connect retry
    handleTimeoutError()
  });
  connectionRedis.on(statusConnectRedis.RECONNECT, () => {
    console.log(`connectionRedis - Connection status: reconnecting`)
    clearTimeout(connectionTimeout)
  });
  connectionRedis.on(statusConnectRedis.ERROR, (error) => {
    console.log(`connectionRedis - Connection status: error ${error}`)
    // connect retry
    handleTimeoutError()
  });
  connectionRedis.connect();
}

export const initRedis = async () => {
  const instanceRedis = await createClient({
    password: process.env.REDIS_PASSWORD,
    socket: {
      host: process.env.REDIS_URI,
      port: process.env.REDIS_PORT
    }
  });
  client.instanceConnect = instanceRedis;
  handleEventConnect({ connectionRedis: instanceRedis });
}

export const getRedis = () => client

export const closeRedis = () => {

}


