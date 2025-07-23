import { QueryTypes } from "sequelize";
import Booking from "../db/models/Booking";
import sequelize from "../db/models/sequelize";
import { BookingDetailDTO } from "../dto/Booking.dto";
import { BadRequestError } from "../utils/error/app.error";

export async function CreateBooking(BookingData: BookingDetailDTO, classDate: Date): Promise<Booking> {
    try {
        const newBooking = await Booking.create({
            Classes_Id: BookingData.Classes_Id,
            User_Id: BookingData.User_Id,
            Date: BookingData.Date,
            classDate
        });

        return newBooking;
    } catch (error) {
        console.error(error);
        throw error;
    };
};

export async function FindBookingByUser_Id(User_Id: number): Promise<Booking[]> {
    const Bookings_Of_User: Booking[] = await Booking.findAll({
        where: {
            User_Id
        }
    });
    return Bookings_Of_User;
};

export async function FindBookingsByClassId(ClassId: number, Date: Date): Promise<Booking[]> {
    const Bookings: Array<Booking> = await sequelize.query(`
        SELECT * FROM Booking
        WHERE Classes_Id = ${ClassId}
        AND Date = '${Date}'
    `, {
        type: QueryTypes.SELECT
    });

    return Bookings;
};

// export async function CancelBookingByClassId(Classes_Id: number, Dates: Date): Promise<void> {
//     const Bookings = await FindBookingsByClassId(Classes_Id, Dates);

//     // Cancel The State OF Booking
//     const CancelBookingPromise = [];
//     if (Bookings.length) {
//         for (const Booking of Bookings) {
//             CancelBookingPromise.push(
//                 sequelize.query(`
//                     UPDATE Booking
//                     SET Status = 'CANCELLED',
//                     Deleted_At = NOW()
//                     WHERE id = ${Booking.id}
//                 `));
//         };
//     };

//     await Promise.all(CancelBookingPromise);
// };

export async function FindBookingsByBookingId(bookingId: number): Promise<Booking> {
    const booking = await Booking.findOne({ where: { id: bookingId } });
    if (!booking) {
        throw new BadRequestError("Booking Not Found");
    };
    return booking;
};


export async function CancelBookingByObject(booking: Booking): Promise<void> {
    booking.Deleted_At = new Date();
    booking.Status = "CANCELLED";
    await booking.save();
};
