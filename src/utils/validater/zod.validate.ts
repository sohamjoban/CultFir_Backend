import { Request, Response, NextFunction } from "express";
import { AnyZodObject } from "zod";
import { BadRequestError } from "../error/app.error";

export const ValidateBody = (schema: AnyZodObject) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await schema.parseAsync(req.body);
            next();
        } catch (error) {
            console.error("Error From Vaildation Body: ", error);
            throw new BadRequestError("Invalid Body");
        };
    };
};