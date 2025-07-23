import { Request, Response, NextFunction } from "express";
import { CreateUserService, UpdateUserService, DeleteUserService } from "../service/user.servcie";
import { StatusCodes } from "http-status-codes";

export async function CreateUserHandler(req: Request, res: Response, next: NextFunction) {
    try {
        const User = await CreateUserService(req.body);
        res.status(StatusCodes.OK).json({
            message: "User Created SuccessFully",
            data: User
        });
    } catch (error) {
        next(error);
    }
};

export async function UpdateUserHandler(req: Request, res: Response, next: NextFunction) {
    try {
        const data = await UpdateUserService(req.body);
        res.status(StatusCodes.OK).json({
            messsage: "User Update Successfully",
            data
        });
    } catch (error) {
        next(error);
    }
};

export async function DeleteUserHandler(req: Request, res: Response, next: NextFunction) {
    try {
        await DeleteUserService(req.body);
        res.status(StatusCodes.OK).json({
            messsage: "User Delete Successfully"
        });
    } catch (error) {
        next(error);
    }
};
