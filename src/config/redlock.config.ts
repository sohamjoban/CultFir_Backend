import Redlock from "redlock";
import Redis from "ioredis";

export const redlock = new Redlock([new Redis("localhost:6379")]);

