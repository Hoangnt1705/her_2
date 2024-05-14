import { getRedis } from "../db/index.js";
export const incr = async (key) => {
    try{
        const { instanceConnect: redisClient } = await getRedis();
        const data = await redisClient.incr(key);
        return data;
    }catch(error)
    {
        return error;
    }
};

export const expire = async (key, ttl) => {
    try {
        const { instanceConnect: redisClient } = await getRedis();
        const data = await redisClient.expire(key, ttl);
        return data
    } catch (error) {
        return error;
    };
};

export const timeToLive = async (key) => {
    try {
        const {instanceConnect: redisClient} = await getRedis();
        const data = await redisClient.ttl(key);
        return data;
    } catch (error) {
        return error;
    };
};


