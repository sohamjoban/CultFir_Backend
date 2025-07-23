import redis from "../config/redis.config";
import { FindSingleClassByPK } from "../repository/Classes.repository";
import { BadRequestError } from "../utils/error/app.error";
import { ClassSlotDTO } from "../dto/Classes.dto";

export async function initializeClassSlotsInRedis(classId: number) {
    const Class = await FindSingleClassByPK(classId);
    await setClassSlotsInRedis(classId, { totalSlot: Class.slot, UsedSlotByIdem: 0 });
};

export async function getClassSlotsFromRedis(classId: number) {
    try {
        const Class = await redis.hgetall(`class:${classId}`);
        if (Class == undefined) throw new BadRequestError("Class Slot Data Do Not Exit in Redis");
        return Class;
    } catch (error) {
        throw error;
    };
};

export async function setClassSlotsInRedis(classId: number, ClassSlots: ClassSlotDTO) {
    await redis.hmset(`class:${classId}`, ClassSlots);
};

export async function deleteClassSlotsFromRedis(classId: number) {
    await redis.del([`class:${classId}`]);
};

export async function incrementHeldSlot(classId: number, key: string) {
    await redis.hincrby(`class:${classId}`, key, 1);
};

export async function decrementHeldSlot(classId: number, key: string) {
    await redis.hincrby(`class:${classId}`, key, -1);
};

export async function decrementTotalSlot(classId: number, key: string) {
    await redis.hincrby(`class:${classId}`, key, -1);
};

export async function addToSortedSet(key: string, score: number, idem: string) {
    await redis.zadd(key, score, idem);
};

export async function getFirstItemFromSortedSet(key: string) {
    return await redis.zrange(key, 0, 0, "WITHSCORES");
};

export async function removeFromSortedSet(key: string, member: string) {
    await redis.zrem(key, member);
};
