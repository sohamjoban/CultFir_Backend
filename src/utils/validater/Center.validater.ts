import { z } from "zod";

export const centerSchema = z.object({
    id: z.number(),
    name: z.string().min(1),
    adderess: z.string().min(1)
});

export const updatecenterSchema = z.object({
    id: z.number(),
    CenterID: z.number(),
    name: z.string().min(1),
    adderess: z.string().min(1)
});

export const deletecenterSchema = z.object({
    id: z.number(),
}); 