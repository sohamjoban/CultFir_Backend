import { Request, Response, NextFunction } from "express";
import { CancelBookingService, CreateBookingService, SaveDateInRedisAndSendIdempotencekey } from "../service/Booking.service";
import { StatusCodes } from "http-status-codes";

export async function CreateBookingHandler(req: Request, res: Response, next: NextFunction) {
    try {
        const result = await SaveDateInRedisAndSendIdempotencekey(req.body);
        res.status(StatusCodes.OK).json(result);
    } catch (error) {
        next(error);
    };
};

export async function FinalizedBookingHandler(req: Request, res: Response, next: NextFunction) {
    try {
        const Booking = await CreateBookingService(req.body);
        res.status(StatusCodes.OK).json({
            message: "Booking Created SuccessFully",
            Booking: Booking
        });
    } catch (error) {
        next(error);
    };
};

export async function CancelBookingHandler(req: Request, res: Response, next: NextFunction) {
    try {
        const Booking = await CancelBookingService(req.body.bookingId);
        res.status(StatusCodes.OK).json({
            message: "Booking Deleted SuccessFully",
            data: Booking
        });
    } catch (error) {
        next(error);
    };
};