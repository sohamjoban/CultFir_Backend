import { CreateBooking } from "../repository/Booking.repository";
import { FindSingleClassByPK } from "../repository/Classes.repository";
import { CancelWaitlist, FindEarliesWaitlisttUser } from "../repository/Waitlist.repository";

export async function ConformWaitlistUserBooking(ClasssId: number): Promise<void> {
    // Find the class by primary key
    const Class = await FindSingleClassByPK(ClasssId);

    // Get the first user from the waitlist
    const EarliestWaitlistUser = await FindEarliesWaitlisttUser(ClasssId);

    // Cancel this user waitlist 
    await CancelWaitlist(EarliestWaitlistUser);

    // Create a booking for the waitlist user
    await CreateBooking(
        {
            Classes_Id: ClasssId,
            Date: new Date(),
            User_Id: EarliestWaitlistUser.userId
        },
        Class.Schedule_Date
    );
};

