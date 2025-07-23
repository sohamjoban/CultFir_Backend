import { HOLYDAY_PAYLOAD_DTO } from "../dto/Holyday.dto";
import { Holyday_Queue } from "../queue/Holidays.queue";

export const HOLYDAY_PAYLOAD = "payload:holyday";

export const AddHolyday_Dates_To_Queue = async (payload: HOLYDAY_PAYLOAD_DTO) => {
    await Holyday_Queue.add(HOLYDAY_PAYLOAD, payload);
};