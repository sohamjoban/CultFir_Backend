import { Queue } from "bullmq";
import { GetRedisConnection } from "../config/redis.config";

export const HOLYDAY_QUEUE = "Holyday-Queue";

export const Holyday_Queue = new Queue(HOLYDAY_QUEUE, {
    connection: GetRedisConnection()
});