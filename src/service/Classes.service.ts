import Classes from "../db/models/Classes";
import sequelize from "../db/models/sequelize";
import { SingleClassDTO, RecurringClassDTO } from "../dto/Classes.dto";
import { CancelClass, CreateSingleClass, FindConflictClassByDates } from "../repository/Classes.repository";
import { FindConflictHolyDayByDates } from "../repository/HolyDay.repository";
import { BadRequestError } from "../utils/error/app.error";
import { initializeClassSlotsInRedis } from "../redis/Class.Redis";
import { GenerateRecurringDates } from "../utils/rrule/recurrence";

export async function CreateSingleClassService(ClassData: SingleClassDTO): Promise<Classes> {

    try {
        const originalDate = new Date(ClassData.Date);
        const bufferedStart = new Date(originalDate.getTime() - 10 * 60 * 1000).toISOString();
        const bufferedEnd = new Date(originalDate.getTime() + 60 * 60 * 1000);

        if (
            await FindConflictClassByDates(
                bufferedStart,
                bufferedEnd,
                ClassData.Center_Id
            )
        ) {
            throw new BadRequestError('Another Class Already Scheduled In This Date');
        };

        if (await FindConflictHolyDayByDates(ClassData.Date, ClassData.Center_Id)) {
            throw new BadRequestError('Can Not Schedule Class On HolyDay');
        };

        // CREATE CLASS AND SAVE CLASS SLOT DATA IN REDIS
        const Class = await CreateSingleClass(ClassData);
        await initializeClassSlotsInRedis(Class.id);
        return Class;
    } catch (error) {
        throw error;
    };

};


export async function CreateRecurringClassService(RecurringClass: RecurringClassDTO): Promise<void> {
    // Find The All Date Of Recurring Class
    const RecurringDate = GenerateRecurringDates({
        StartDate: RecurringClass.StartDate,
        EndDate: RecurringClass.EndDate,
        WeekDay: RecurringClass.Day
    });
    // Create The Class By Date
    try {
        await sequelize.transaction(async (t) => {
            const CreateClassByDates = [];
            for (const date of RecurringDate) {
                CreateClassByDates.push(CreateSingleClass({
                    id: RecurringClass.id,
                    Center_Id: RecurringClass.CenterId,
                    Date: date,
                    type: RecurringClass.type,
                    slot: RecurringClass.slot
                }));
            };
            await Promise.all(CreateClassByDates);
        });
    } catch (error) {
        throw new Error("Internal Server Error");
    };
};

export async function CancelClassesOnHolyDay(Classes: Classes[]): Promise<void> {
    const CancelClassPromise = Classes.map((Class) => {
        return CancelClass(Class);
    });
    await Promise.all(CancelClassPromise);
};