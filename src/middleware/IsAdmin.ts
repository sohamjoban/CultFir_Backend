import { Request, Response, NextFunction } from "express";
import { IsAdmin } from "../repository/user.repository";
import { UnauthorizedError } from "../utils/error/app.error";

export async function RestrictForAdminOnly(req: Request, res: Response, next: NextFunction) {
    if (await IsAdmin(req.body.id)) {
        return next();
    };
    throw new UnauthorizedError("Access denied. Admins only.");
};