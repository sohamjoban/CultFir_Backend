
export type BookingDetailDTO = {
    Classes_Id: number,
    User_Id: number,
    Date: Date
};

export type RedisBookingDTO = {
    idempotenceKey: string,
    Classes_Id: number,
    User_Id: number,
    Date: Date
};

export type IdempotenceKey = {
    idempotenceKey: string,
};