import Classes from "../db/models/Classes";
import { BookingDetailDTO, IdempotenceKey } from "../dto/Booking.dto";
import { CancelBookingByObject, CreateBooking, FindBookingByUser_Id, FindBookingsByBookingId, FindBookingsByClassId } from "../repository/Booking.repository";
import { FindSingleClassByPK } from "../repository/Classes.repository";
import { FindUserByPK, IncreaseUserBookingCount } from "../repository/user.repository";
import { CreateWaitlistuser, IsUserInWaitlist } from "../repository/Waitlist.repository";
import { BadRequestError } from "../utils/error/app.error";
import { SaveBookingDateInRedis, GetBookingDataByIdempotence, deleteIdem } from "../redis/Booking.redis";
import { addToSortedSet, decrementHeldSlot, decrementTotalSlot, removeFromSortedSet, getClassSlotsFromRedis, getFirstItemFromSortedSet, incrementHeldSlot } from "../redis/Class.Redis";
import { GenerateUniqueid } from "../utils/helper/uniqueIdGenerate.helper";
import { DecreaseUserBookingCount, HasUserReachedMaxBooking } from "./user.servcie";
import { ConformWaitlistUserBooking } from "./waitlist.service";
import Booking from "../db/models/Booking";

export async function CreateBookingService(idem: IdempotenceKey) {

    try {
        const BookingData = await GetBookingDataByIdempotence(idem.idempotenceKey);
        const Class = await FindSingleClassByPK(BookingData.Classes_Id);
        Class.slot -= 1;
        Class.save();
        const Booking = await CreateBooking(BookingData, Class.Schedule_Date);
        // DELETE IDEM FROM REDIS
        await deleteIdem(idem.idempotenceKey);
        await IncreaseUserBookingCount(BookingData.User_Id);
        // DECREASE THE TOTAL SLOT COUNT IN REDIS AND DECREASE THE IDEM WHICH IS USED
        await decrementTotalSlot(Class.id, "totalSlot");
        await decrementHeldSlot(Class.id, "UsedSlotByIdem");
        await removeFromSortedSet(`PendingIdem:${Class.id}`, idem.idempotenceKey);
        return Booking;
    } catch (error) {
        console.log(error);
        throw error;
    };
};

export async function SaveDateInRedisAndSendIdempotencekey(BookingData: BookingDetailDTO) {

    try {
        // Check Is User Make Alredy Booking 
        if (await IsUserMakeAlredyBooking(BookingData.Classes_Id, BookingData.User_Id, BookingData.Date)) {
            throw new BadRequestError("You Alredy Make A Booking");
        };
        const IdempotenceKey = GenerateUniqueid();
        await FindUserByPK(BookingData.User_Id);
        const Class = await FindSingleClassByPK(BookingData.Classes_Id);
        // VALIDATE HAVE MAXIUMUM BOOKING OR NOT
        await ValidateUserBookingLimit(BookingData.User_Id);
        // CHECK IF CLASS SLOT ARE AVAILABLE OR NOT
        // HERE IF CLASS SLOT 0 SO IT CREATE WAITLIST AND RETURN IT
        const WAITLIST = await IsClassSlotAvailable(Class, BookingData.User_Id);
        if (WAITLIST) {
            return WAITLIST;
        };
        // DELETE EXPIRE IDEM SLOT IF EXIT
        await DeleteExpireIdem(Class.id);
        // CHECK IS ALL IDEM KEY LIMIT REACHED
        await IsIdemKeyLimitReached(Class.id);
        // CHECK IF BOOKING DATE IS BEFORE 1 HOUR OF CLASS START OR NOT
        await IsClassStartLessThanOneHourAway(Class, BookingData);
        // SAVE DATA IN REDIS
        await SaveBookingDateInRedis({ idempotenceKey: IdempotenceKey, ...BookingData });
        // STORE IDEMKEY IN SORTEAD SET AND DECREASE TOTAL REMAINING IDEM KEYS
        await addToSortedSet(`PendingIdem:${Class.id}`, Math.floor(Date.now() + 2 * 60 * 1000), IdempotenceKey);
        await incrementHeldSlot(Class.id, "UsedSlotByIdem");
        return {
            message: "Your Idempotency key Is here: ",
            IdempotenceKey
        };
    } catch (error) {
        throw error;
    };
};

export async function CancelBookingService(bookingId: number) {
    const booking = await CancelBooking(bookingId);
    // Create Booking Of waitlist user
    ConformWaitlistUserBooking(booking.Classes_Id);
    return booking;
};

async function IsClassSlotAvailable(Class: Classes, userId: number) {
    if (Class.slot == 0) {
        if (await IsUserInWaitlist(Class.id, userId)) {
            throw new BadRequestError("You Are Alredy Added In Waitlist");
        };
        const WaitList = await CreateWaitlistuser(Class.id, userId);
        return {
            message: "Due To No Slot, We Add You In Waitlist",
            Waitlist: WaitList
        };
    };
};

async function DeleteExpireIdem(classId: number) {
    const IdemExpireAt = await getFirstItemFromSortedSet(`PendingIdem:${classId}`);
    const CurrentTime = Math.floor(Date.now() / 1000) * 1000;

    if (Number(IdemExpireAt[1]) <= CurrentTime) {
        // REMOVE EXPIRE IDEM 
        await removeFromSortedSet(`PendingIdem:${classId}`, IdemExpireAt[0]);
        // INCREASE HELD SLOT
        await decrementHeldSlot(classId, "UsedSlotByIdem");
    };
};

async function IsIdemKeyLimitReached(classId: number) {
    const ClassSlot = await getClassSlotsFromRedis(classId);

    if (ClassSlot == undefined) throw new Error("Class Slot Is undefined");

    if (Number(ClassSlot.totalSlot) - Number(ClassSlot.UsedSlotByIdem) <= 0) {
        throw new BadRequestError("Due To High Trafic On This Class,Try After 15 Minites");
    };
};

async function IsClassStartLessThanOneHourAway(Class: Classes, Booking: BookingDetailDTO) {
    const ClassDate = new Date(Class.Schedule_Date.getTime() - 60 * 60 * 1000);
    // CHECK IF BOOKING DATE IS BEFORE 1 HOUR OF CLASS START OR NOT
    if (new Date(Booking.Date) > ClassDate) {
        throw new BadRequestError("Can Not Create Booking Before 1 Hour of Class Start");
    };
};

async function ValidateUserBookingLimit(userId: number) {
    if (await HasUserReachedMaxBooking(userId)) {
        throw new BadRequestError("You Are Already Book Maximum Slot");
    };
};

export async function CancelBookingByUserId(UserId: number): Promise<Booking[]> {
    const UserBookings: Booking[] = await FindBookingByUser_Id(UserId);

    const AllBookings = UserBookings.map((booking) => {
        return CancelBooking(booking.id);
    });

    await Promise.all(AllBookings);

    return UserBookings;
};


export async function CancelBulkBooking(Bookings: Booking[]) {
    const CancelBookingsPromise = Bookings.map((booking) => {
        return deleteBooking(booking);
    });
    await Promise.all(CancelBookingsPromise);
};

export async function deleteBooking(booking: Booking) {
    await CancelBookingByObject(booking);
    await DecreaseUserBookingCount(booking.User_Id);
};

export async function CancelBookingByClassId(Classes_Id: number, Dates: Date): Promise<void> {
    const Bookings = await FindBookingsByClassId(Classes_Id, Dates);
    await CancelBulkBooking(Bookings);
};

export async function CancelBulkBookingByClassId(Classes: Classes[], Date: Date): Promise<void> {
    const CancelBookings = Classes.map((Class) => {
        return CancelBookingByClassId(Class.id, Date);
    });
    await Promise.all(CancelBookings);
};

export async function CancelBooking(bookingId: number): Promise<Booking> {
    const Booking = await FindBookingsByBookingId(bookingId);
    await CancelBookingByObject(Booking);
    await DecreaseUserBookingCount(Booking.User_Id);
    return Booking;
};

export async function IsUserMakeAlredyBooking(classId: number, userId: number, date: Date): Promise<boolean> {
    // Find all bookings for this class, then check if any booking matches the given user ID
    const ClassBookings = await FindBookingsByClassId(classId, date);
    return ClassBookings.some((booking) => booking.User_Id === userId);
};
