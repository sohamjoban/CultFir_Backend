import { Worker, Job } from "bullmq";
import { HOLYDAY_PAYLOAD_DTO } from "../dto/Holyday.dto";
import { HOLYDAY_QUEUE } from "../queue/Holidays.queue";
import { GetRedisConnection } from "../config/redis.config";
import { HOLYDAY_PAYLOAD } from "../producers/holyday.producer";
import { CancelOnHolidayService } from "../service/HolyDay.service";

export function SetUpHolydayWorker() {

    const HolydayProcessor = new Worker<HOLYDAY_PAYLOAD_DTO>(
        HOLYDAY_QUEUE,
        async (job: Job) => {

            if (job.name !== HOLYDAY_PAYLOAD) {
                throw new Error("Invalid Job Name");
            };

            const payload = job.data;
            await CancelOnHolidayService(payload.CenterId, payload.Date);
            console.log("HolyDay Updated Successfully");
        },
        {
            connection: GetRedisConnection()
        }
    );

    HolydayProcessor.on("failed", (e) => {
        console.log("Error Happpen To Processor: ", e)
    });

    HolydayProcessor.on("completed", () => {
        console.log("holyday Proccessing Successfully");
    });
};