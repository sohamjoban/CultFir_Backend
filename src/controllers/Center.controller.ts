import { Request, Response, NextFunction } from "express";
import { CreateCenterService, UpdateCenterService, DeleteCenterService } from "../service/Center.service";
import { StatusCodes } from "http-status-codes";

export async function CreateCenterHandler(req: Request, res: Response, next: NextFunction) {
    try {
        const Center = await CreateCenterService(req.body);

        res.status(StatusCodes.OK).json({
            message: "Center Created Successfully",
            data: Center,
        });
    } catch (error) {
        next(error);
    };
};

export async function UpdateCenterHandler(req: Request, res: Response, next: NextFunction) {
    try {
        const Center = await UpdateCenterService(req.body);

        res.status(StatusCodes.OK).json({
            message: "Update  Center  Successfully",
            data: Center,
        });
    } catch (error) {
        next(error);
    };
};

export async function DeleteCenterHandler(req: Request, res: Response, next: NextFunction) {
    try {
        const Center = await DeleteCenterService(req.body.centerId);
        res.status(StatusCodes.OK).json({
            message: "Center Delete Successfully",
            data: Center,
        });
    } catch (error) {
        next(error);
    };
};
