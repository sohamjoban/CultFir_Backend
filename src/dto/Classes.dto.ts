import { WeekdayKey } from "./Recurring.dto";

export type SingleClassDTO = {
    id: number
    Center_Id: number,
    Date: Date,
    type: string,
    slot: number
};

export type RecurringClassDTO = {
    id: number,
    CenterId: number,
    StartDate: Date,
    EndDate: Date,
    type: string,
    Day: Array<WeekdayKey>,
    slot: number
};

export type ClassSlotDTO = {
    totalSlot: number,
    UsedSlotByIdem: number
}

