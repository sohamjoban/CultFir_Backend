import Booking from "../db/models/Booking";
import WaitList from "../db/models/WaitList";
import { UserDTO, UpdateUserFiledDTO, DeleteUserDTO, newUserDTO } from "../dto/user.dto";
import { CreateUser, DeleteUser, FindUserByPK, UpdateUser } from "../repository/user.repository";
import { CancelWaitlist, getAllWaitlistsForUser } from "../repository/Waitlist.repository";
import { formatPhoneNumber } from "../utils/helper/NumberFormate.helper";
import { CancelBookingByUserId } from "./Booking.service";
import { ConformWaitlistUserBooking } from "./waitlist.service";

export async function CreateUserService(userData: UserDTO): Promise<newUserDTO> {
    userData.phone_number = await formatPhoneNumber(userData.phone_number, userData.CountryCode);
    const User = await CreateUser(userData);
    return User;
};

export async function UpdateUserService(userdata: UpdateUserFiledDTO): Promise<string> {
    const User = await UpdateUser(userdata);
    return User;
};

export async function DeleteUserService(user: DeleteUserDTO): Promise<void> {
    // DELETE USER FROM BOOKINGS
    const DeleteBookings: Booking[] = await CancelBookingByUserId(user.id);
    // PROMOTE WAITLIST USERS
    await PromoteWaitlistUsers(DeleteBookings);
    // DELETE USER FROM WAITLISTS
    await deleteUserFromAllWaitlists(user.id);
    // CONFORM WAITLIST 
    await DeleteUser(user);
};

export async function HasUserReachedMaxBooking(userid: number): Promise<boolean> {
    const user = await FindUserByPK(userid);
    return user.MaxBooking >= 4;
};

export async function DecreaseUserBookingCount(userid: number): Promise<void> {
    const user = await FindUserByPK(userid);
    if (user.MaxBooking) {
        user.MaxBooking -= 1;
        await user.save();
    };
};

async function deleteUserFromAllWaitlists(userId: number): Promise<void> {
    const UserWaitlists: WaitList[] = await getAllWaitlistsForUser(userId);
    if (UserWaitlists.length) {
        const AllWaitlists = UserWaitlists.map((waitlist) => {
            return CancelWaitlist(waitlist);
        });
        await Promise.all(AllWaitlists);
    };
};

async function PromoteWaitlistUsers(bookings: Booking[]) {
    const WaitListUsers = bookings.map((booking) => {
        return ConformWaitlistUserBooking(booking.Classes_Id);
    });
    await Promise.all(WaitListUsers);
};