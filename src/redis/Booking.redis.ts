import redis from "../config/redis.config";
import { BookingDetailDTO, RedisBookingDTO } from "../dto/Booking.dto";
import { BadRequestError } from "../utils/error/app.error";

export async function SaveBookingDateInRedis(BookingData: RedisBookingDTO): Promise<void> {

    const value = JSON.stringify({
        Classes_Id: BookingData.Classes_Id,
        User_Id: BookingData.User_Id,
        Date: BookingData.Date,
    });

    await redis.set(BookingData.idempotenceKey, value);
    await redis.expire(BookingData.idempotenceKey, 1800);
};

export async function GetBookingDataByIdempotence(idempotenceKey: string): Promise<BookingDetailDTO> {
    try {
        const BookingData = await redis.get(idempotenceKey);
        if (!BookingData) {
            throw new BadRequestError("Idempotence Key expired. Please book again.");
        };
        return JSON.parse(BookingData);
    } catch (error) {
        throw new BadRequestError("An unexpected error occurred. Please try again.");
    };
};

export async function deleteIdem(idem: string): Promise<void> {
    await redis.del(idem);
};



