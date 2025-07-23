import { Router } from "express";
import { CreateUserHandler, UpdateUserHandler, DeleteUserHandler } from "../controllers/user.controller";
import { ValidateBody } from "../utils/validater/zod.validate";
import { UserSchema, UpdateUserSchema, DeleteUserSchema } from "../utils/validater/user.validater";

const UserRouter = Router();

UserRouter.post("/Signup", ValidateBody(UserSchema), CreateUserHandler);
UserRouter.patch("/Update", ValidateBody(UpdateUserSchema), UpdateUserHandler);
UserRouter.delete("/delete", ValidateBody(DeleteUserSchema), DeleteUserHandler);

export default UserRouter;