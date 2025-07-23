import winston from "winston";
import "winston-mongodb";
import { serverconfig } from ".";

const logger = winston.createLogger({
    format: winston.format.combine(
        winston.format.timestamp({ format: "MM-DD-YYYY HH:mm:ss" }),
        winston.format.json(),
        winston.format.printf(({ level, message, timestamp, data }) => {
            const output = {
                level,
                message,
                timestamp,
                data
            };
            return JSON.stringify(output);
        })
    ),
    transports: [
        new winston.transports.MongoDB({
            level: "info",
            db: serverconfig.MONGO_LOGGER,
            collection: serverconfig.LOGGER_COLLECTION
        })
    ]
});

export default logger;