import { Weekday } from "rrule";
import { z } from "zod";

export const ClassSchema = z.object({
    id: z.number(),
    Center_Id: z.number(),
    Date: z.preprocess(
        (val) => {
            if (typeof val == "string" && /Z$|[+-]\d{2}:\d{2}$/.test(val)) {
                return new Date(val)
            };
            return undefined;
        },
        z.date()
    ),
    type: z.string().min(1),
});

const WeekDaySchema = z.enum(['MO', 'TU', 'WE', 'TH', 'FR', 'SA', 'SU']);

export const RecurringClassSchema = z.object({
    id: z.number(),
    CenterId: z.number(),
    type: z.string().min(1),
    Day: z.array(WeekDaySchema),
    slot: z.number(),

    StartDate: z.preprocess(
        (val) => {
            if (typeof val == "string" && /Z$|[+-]\d{2}:\d{2}$/.test(val)) {
                return new Date(val)
            };
            return undefined;
        },
        z.date()
    ),
    EndDate: z.preprocess(
        (val) => {
            if (typeof val == "string" && /Z$|[+-]\d{2}:\d{2}$/.test(val)) {
                return new Date(val)
            };
            return undefined;
        },
        z.date()
    ),
});
