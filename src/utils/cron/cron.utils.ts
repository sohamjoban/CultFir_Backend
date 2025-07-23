import cron from "node-cron";
import { FindAllClasses, UpdateClassStatus } from "../../repository/Classes.repository";
import Classes from "../../db/models/Classes";

const UpdateClassStatusJob = cron.schedule("0 0 * * *", async () => {

    const Current_Date = new Date();
    const All_Classes = await FindAllClasses();

    const All_Classes_Promises = All_Classes
        .filter(Class => Class.Status !== "ACTIVE" && ShouldUpdateClassStatus(Current_Date, Class))
        .map((Class) => {

            return DoClassStatusUpdate(Class).catch((error) => {
                console.error(`Failed To Update Class: ${Class.id} Error: ${error}`);
            })
        });


    await Promise.all(All_Classes_Promises);

});

function ShouldUpdateClassStatus(Current_Date: Date, val: Classes) {
    return Current_Date >= new Date(`${val.Schedule_Date}z`);
};

async function DoClassStatusUpdate(val: Classes) {
    await UpdateClassStatus(val);
    console.log("Update Status Successfully");
};


export default UpdateClassStatusJob;