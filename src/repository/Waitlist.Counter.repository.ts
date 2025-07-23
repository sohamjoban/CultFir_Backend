// import Class_Waitlist_Counter from "../db/models/Class.Waitlist.Counter";
// import { BadRequestError } from "../utils/error/app.error";

// export async function CreateWaitListCounterClass(classId: number) {
//     try {
//         await Class_Waitlist_Counter.create({
//             classId,
//             waitlist_added: 0,
//             waitlist_removed: 0
//         });
//     } catch (error) {
//         console.error(error);
//     };
// };

// export async function FindWaitlistCounter(classId: number) {

//     const waitlist_counter = await Class_Waitlist_Counter.findOne({
//         where: {
//             classId
//         }
//     });

//     if (!waitlist_counter) {
//         throw new BadRequestError("WaitList Counter Not Found");
//     };

//     return waitlist_counter;
// };

// export async function UpdateWaitlistAddedFiled(classId: number) {
//     const waitlist_number = await FindWaitlistCounter(classId);
//     waitlist_number.waitlist_added += 1;
//     await waitlist_number.save();
// };

// export async function UpdateWaitlistRemoveFiled(classId: number) {
//     const waitlist_number = await FindWaitlistCounter(classId);
//     waitlist_number.waitlist_removed += 1;
//     await waitlist_number.save();
// };
