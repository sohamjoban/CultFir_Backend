import { Router } from "express";
import { CreateBookingHandler, FinalizedBookingHandler, CancelBookingHandler } from "../controllers/Booking.controller";
import { ValidateBody } from "../utils/validater/zod.validate";
import { CancelBookingSchema, ConfirmBookingSchema, CreateBookingSchema } from "../utils/validater/Booking.validater";

const BookingRouter = Router();

BookingRouter.post("/Create", ValidateBody(CreateBookingSchema), CreateBookingHandler);
BookingRouter.post("/finalized", ValidateBody(ConfirmBookingSchema), FinalizedBookingHandler);
BookingRouter.delete("/cancel", ValidateBody(CancelBookingSchema), CancelBookingHandler);

export default BookingRouter;