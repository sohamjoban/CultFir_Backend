import { z } from "zod";

export const HolyDaySchema = z.object({
    id: z.number().positive(),
    centerId: z.number().positive(),
    date: z.preprocess(
        (val) => {
            if (typeof val == "string" && /Z$|[+-]\d{2}:\d{2}$/.test(val)) {
                return new Date(val)
            };
            return undefined;
        },
        z.date()
    )
});