import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { CreateHolyDayService } from "../service/HolyDay.service";


export async function CreateHolyDayHandeler(req: Request, res: Response, next: NextFunction) {
    try {
        await CreateHolyDayService(req.body);
        res.status(StatusCodes.OK).json({
            message: "HolyDay Declare Successfully",
        });
    } catch (error) {
        console.error();
        next(error);
    };
};

