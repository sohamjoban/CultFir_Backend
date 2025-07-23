import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/error/app.error";
import { StatusCodes } from "http-status-codes";

export const AppErrorHandler = (err: AppError, req: Request, res: Response, next: NextFunction) => {

    res.status(err.StatusCode).json({
        name: err.name,
        message: err.message
    });
};

export const InternalServerError = (err: Error, req: Request, res: Response, next: NextFunction) => {
    
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: "Internal Server Error"
    });
};