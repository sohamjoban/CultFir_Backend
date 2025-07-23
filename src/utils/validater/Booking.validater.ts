import { z } from "zod";

export const CreateBookingSchema = z.object({
    Classes_Id: z.number().positive(),
    User_Id: z.number().positive(),
    Date: z.preprocess(
        (val) => {
            if (typeof val == "string" && /Z$|[+-]\d{2}:\d{2}$/.test(val)) {
                return new Date(val)
            };
            return undefined;
        },
        z.date()
    )
});

export const ConfirmBookingSchema = z.object({
    idempotenceKey: z.string().min(1)
});

export const CancelBookingSchema = z.object({
    bookingId: z.number().positive()
});