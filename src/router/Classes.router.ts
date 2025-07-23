import { Router } from "express";
import { RestrictForAdminOnly } from "../middleware/IsAdmin";
import { CreateSingleClassHandler, CreateRecurringClassHandler } from "../controllers/Classes.controller";
import { ValidateBody } from "../utils/validater/zod.validate";
import { ClassSchema, RecurringClassSchema } from "../utils/validater/Class.validater";

const ClassesRouter = Router();

ClassesRouter.post("/SingleClassCreate", RestrictForAdminOnly, ValidateBody(ClassSchema), CreateSingleClassHandler);
ClassesRouter.post("/RecurringClassCreate", RestrictForAdminOnly, ValidateBody(RecurringClassSchema), CreateRecurringClassHandler);

export default ClassesRouter;