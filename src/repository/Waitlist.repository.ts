import WaitList from "../db/models/WaitList";
import { BadRequestError } from "../utils/error/app.error";

export async function CreateWaitlistuser(classId: number, userId: number) {

    try {
        const waitlist = await WaitList.create({
            classId,
            userId,
        });

        // Return User Waitlist Position
        return waitlist;
    } catch (error) {
        console.error(error);
        throw error;
    };
};


export async function CancelWaitlist(waitList: WaitList) {
    waitList.DeletedAt = new Date();
    await waitList.save();
};

export async function getAllWaitlistsForUser(userId: number): Promise<WaitList[]> {
    const UserWaitlists = await WaitList.findAll({ where: { userId, DeletedAt: null } });
    return UserWaitlists;
};

export async function IsUserInWaitlist(classId: number, userId: number): Promise<boolean> {
    const WaitListUser = await WaitList.findOne({ where: { classId, userId } });
    return WaitListUser !== null;
};

export async function FindEarliesWaitlisttUser(classId: number): Promise<WaitList> {
    const WaitlistUser = await WaitList.findOne({
        where: { classId, DeletedAt: null },
        order: [["createdAt", "ASC"]]
    });
    if (!WaitlistUser) {
        throw new BadRequestError("Waitlist User Do Not Found");
    };
    return WaitlistUser;
};

