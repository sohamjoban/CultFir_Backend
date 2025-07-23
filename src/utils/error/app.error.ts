import { StatusCodes } from "http-status-codes";

export interface AppError extends Error {
    StatusCode: number
};

export class InternalServerError implements AppError {
    StatusCode: number;
    message: string;
    name: string;

    constructor(message: string) {
        this.StatusCode = StatusCodes.INTERNAL_SERVER_ERROR;
        this.message = message;
        this.name = "InternalServerError";
    };
};

export class BadRequestError implements AppError {
    StatusCode: number;
    message: string;
    name: string;

    constructor(message: string) {
        this.StatusCode = StatusCodes.BAD_REQUEST;
        this.message = message;
        this.name = "BadRequestError";
    };
};

export class UnauthorizedError implements AppError {
    StatusCode: number;
    message: string;
    name: string;

    constructor(message: string) {
        this.StatusCode = StatusCodes.UNAUTHORIZED;
        this.message = message;
        this.name = "UnauthorizedError";
    };
};

export class NotFoundError implements AppError {
    StatusCode: number;
    message: string;
    name: string;

    constructor(message: string) {
        this.StatusCode = StatusCodes.NOT_FOUND;
        this.message = message;
        this.name = "NotFoundError";
    };
};

export class NotImplementedError implements AppError {
    StatusCode: number;
    message: string;
    name: string;

    constructor(message: string) {
        this.StatusCode = StatusCodes.NOT_IMPLEMENTED;
        this.message = message;
        this.name = "NotImplementedError";
    };
};

export class ConflictError implements AppError {
    StatusCode: number;
    message: string;
    name: string;

    constructor(message: string) {
        this.StatusCode = StatusCodes.CONFLICT;
        this.message = message;
        this.name = "ConflictError";
    };
};

export class ForbiddenError implements AppError {
    StatusCode: number;
    message: string;
    name: string;

    constructor(message: string) {
        this.StatusCode = StatusCodes.FORBIDDEN;
        this.message = message;
        this.name = "ForbiddenError";
    };
};

export class ApiError implements AppError {
    StatusCode: number;
    message: string;
    name: string;

    constructor(StatusCode: number, message: string, name: string) {
        this.StatusCode = StatusCode;
        this.message = message;
        this.name = name;
    };
}


