import dotenv from "dotenv";

dotenv.config();

type ServerConfig = {
    PORT: number,
    REDIS_HOST: string,
    REDIS_PORT: number,
    MONGO_LOGGER: string,
    LOGGER_COLLECTION: string
};

type DBConfig = {
    DB_HOST: string,
    DB_USER: string,
    DB_NAME: string,
    DB_PASSWORD: string,
};

export function getEnvValue(key: string): string {
    let val = process.env[key];

    if (!val) {
        throw new Error("Value Not Found");
    };

    return val;
};

export const serverconfig: ServerConfig = {
    PORT: Number(process.env.PORT),
    REDIS_HOST: getEnvValue("REDIS_HOST"),
    REDIS_PORT: Number(process.env.REDIS_PORT),
    MONGO_LOGGER: getEnvValue("LOGGER_DB_URL"),
    LOGGER_COLLECTION: getEnvValue("LOGGER_COLLECTION")
};


export const dbconfig: DBConfig = {
    DB_HOST: getEnvValue("DB_HOST"),
    DB_NAME: getEnvValue("DB_NAME"),
    DB_USER: getEnvValue("DB_USER"),
    DB_PASSWORD: getEnvValue("DB_PASSWORD")
};


