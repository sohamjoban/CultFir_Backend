import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { CreateSingleClassService, CreateRecurringClassService } from "../service/Classes.service";

export async function CreateSingleClassHandler(req: Request, res: Response, next: NextFunction) {

    try {
        const Class = await CreateSingleClassService(req.body);
        res.status(StatusCodes.OK).json({
            message: "Class Created Successfully",
            data: Class
        });
    } catch (error) {
        next(error);
    }

};

export async function CreateRecurringClassHandler(req: Request, res: Response, next: NextFunction) {
    try {
        await CreateRecurringClassService(req.body);
        res.status(StatusCodes.OK).json({
            message: "Recurring Class Created Successfully",
        });
    } catch (error) {
        next(error);
    };
};

