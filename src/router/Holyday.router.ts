import { Router } from "express";
import { RestrictForAdminOnly } from "../middleware/IsAdmin";
import { CreateHolyDayHandeler } from "../controllers/HolyDay.controller";
import { ValidateBody } from "../utils/validater/zod.validate";
import { HolyDaySchema } from "../utils/validater/Holyday.validater";

const HolydayRouter = Router();

HolydayRouter.post("/declare", ValidateBody(HolyDaySchema), RestrictForAdminOnly, CreateHolyDayHandeler);

export default HolydayRouter;