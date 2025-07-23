import { HolyDayDTO } from "../dto/Holyday.dto";
import { AddHolyday_Dates_To_Queue } from "../producers/holyday.producer";
import { GetCenterClassesByDate } from "../repository/Classes.repository";
import { CreateHolyday, IsHolydayAlredyDeclare } from "../repository/HolyDay.repository";
import { BadRequestError } from "../utils/error/app.error";
import { CancelBulkBookingByClassId } from "./Booking.service";
import { CancelClassesOnHolyDay } from "./Classes.service";

export async function CreateHolyDayService(HolyDayData: HolyDayDTO) {
    try {
        // Check Is Holyday Already Declare
        const HolydayDate = new Date(HolyDayData.date);
        if (await IsHolydayAlredyDeclare(HolyDayData.centerId, HolydayDate.toISOString().split("T")[0])) {
            throw new BadRequestError("HolyDay Alredy Decalre At This Date");
        };
        await CreateHolyday(HolyDayData);
        AddHolyday_Dates_To_Queue({ Date: HolyDayData.date, CenterId: HolyDayData.centerId });
    } catch (error) {
        throw error;
    };
};

export async function CancelOnHolidayService(Center_Id: number, Date: Date): Promise<void> {
    // HERE NEED TO DELETE TWO THINGS CLASS AND BOOKINGS

    // DELETE CLASS WHICH ARE SCHEDULE IN THIS DATE OF CENTER ID
    const AllClass = await GetCenterClassesByDate(Center_Id, Date);

    // Make the Class State CANCELLED 
    await CancelClassesOnHolyDay(AllClass);

    // Make The Booking Cancel Which On Class
    await CancelBulkBookingByClassId(AllClass, Date);
};
