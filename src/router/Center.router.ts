import { Router } from "express";
import { RestrictForAdminOnly } from "../middleware/IsAdmin";
import { CreateCenterHandler, UpdateCenterHandler, DeleteCenterHandler } from "../controllers/Center.controller";
import { ValidateBody } from "../utils/validater/zod.validate";
import { centerSchema, deletecenterSchema, updatecenterSchema } from "../utils/validater/Center.validater";

const CenterRouter = Router();

CenterRouter.post("/Create", ValidateBody(centerSchema), RestrictForAdminOnly, CreateCenterHandler);
CenterRouter.patch("/Update", ValidateBody(updatecenterSchema), RestrictForAdminOnly, UpdateCenterHandler);
CenterRouter.delete("/Delete", ValidateBody(deletecenterSchema), RestrictForAdminOnly, DeleteCenterHandler);

export default CenterRouter;