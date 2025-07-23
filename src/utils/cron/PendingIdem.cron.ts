import cron from "node-cron";
import { FindAllClasses } from "../../repository/Classes.repository";
import { decrementHeldSlot, getFirstItemFromSortedSet, removeFromSortedSet } from "../../redis/Class.Redis";

export const RemovePendingIdemJOB = cron.schedule("*/5 * * * *", async () => {

    const All_Classes = await FindAllClasses();
    const CurrentTime = Math.floor(Date.now() / 1000) * 1000;

    const PendingIdems = All_Classes.map(async (Class) => {
        const IsIdemExpire = await getFirstItemFromSortedSet(`PendingIdem:${Class.id}`);
        if (IsIdemExpire != undefined) {
            if (Number(IsIdemExpire[1]) <= CurrentTime) {
                // REMOVE EXPIRE IDEM 
                removeFromSortedSet(`PendingIdem:${Class.id}`, IsIdemExpire[0]);
                // INCREASE HELD SLOT
                decrementHeldSlot(Class.id, "UsedSlotByIdem");
            };
        };
    });

    await Promise.all(PendingIdems);
});

