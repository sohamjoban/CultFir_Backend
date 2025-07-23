import express from "express";
import UserRouter from "./router/user.router";
import { AppErrorHandler, InternalServerError } from "./middleware/error.middleware";
import CenterRouter from "./router/Center.router";
import ClassesRouter from "./router/Classes.router";
import { CreateConnectionBetweenClassAndCenter } from "./db/models";
import BookingRouter from "./router/Booking.router";
import UpdateClassStatusJob from "./utils/cron/cron.utils";
import HolydayRouter from "./router/Holyday.router";
import { SetUpHolydayWorker } from "./processors/Holyday.processors";
import { RemovePendingIdemJOB } from "./utils/cron/PendingIdem.cron";

const app = express();

CreateConnectionBetweenClassAndCenter();
UpdateClassStatusJob.start();
RemovePendingIdemJOB.start();
SetUpHolydayWorker();

app.use(express.json());
app.use("/user", UserRouter);
app.use("/Center", CenterRouter);
app.use("/Class", ClassesRouter);
app.use("/Booking", BookingRouter);
app.use("/HolyDay", HolydayRouter);

app.use(AppErrorHandler);
app.use(InternalServerError);

app.listen(1221, () => {
    console.log("Server Started: ");
});