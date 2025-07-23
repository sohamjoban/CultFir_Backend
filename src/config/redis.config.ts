import Redis from "ioredis";
import { serverconfig } from ".";

// REDIS FOR STORING VALUE 
const redis = new Redis("localhost:6379");

redis.on("connect", () => console.log("Redis Connected"));
redis.on("error", (err) => console.error("Redis Error: ", err));

// REDIS FOR PRODUCER AND SUBSCRIBER
function CreateRedisConnection() {

    let connection: Redis;

    const redis_Config = {
        port: serverconfig.REDIS_PORT,
        host: serverconfig.REDIS_HOST,
        maxRetriesPerRequest: null
    }

    return () => {
        if (!connection) {
            connection = new Redis(redis_Config);
        };
        return connection;
    }
};


export default redis;

export const GetRedisConnection = CreateRedisConnection();