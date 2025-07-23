import { QueryTypes } from "sequelize";
import Classes from "../db/models/Classes";
import sequelize from "../db/models/sequelize";
import { SingleClassDTO } from "../dto/Classes.dto";
import { NotFoundError } from "../utils/error/app.error";

export async function CreateSingleClass(ClassData: SingleClassDTO): Promise<Classes> {
    try {
        const NewClass = await Classes.create({
            Type: ClassData.type,
            Schedule_Date: ClassData.Date,
            Center_Id: ClassData.Center_Id,
            EndDate: new Date(new Date(ClassData.Date).getTime() + 50 * 60 * 1000),
            slot: ClassData.slot,
        });
        return NewClass;
    } catch (error) {
        throw error;
    };
};

export async function FindSingleClassByPK(id: number): Promise<Classes> {
    const Class = await Classes.findOne({
        where: {
            id,
        },
    });

    if (!Class) {
        throw new NotFoundError("Class Not Found");
    };

    return Class;
};

export async function FindAllClasses(): Promise<Classes[]> {
    return Classes.findAll();
};

export async function UpdateClassStatus(UpdateClass: Classes): Promise<void> {
    UpdateClass.Status = "ACTIVE";

    await UpdateClass.save();
};

export async function FindClassByCenterId(Center_Id: number): Promise<boolean> {
    const Center = await Classes.findOne({
        where: {
            Center_Id,

        },
    });

    if (Center) {
        return true;
    } else {
        return false;
    };
};

export async function GetCenterClassesByDate(Center_Id: number, Date: Date): Promise<Classes[]> {
    const Class: Array<Classes> = await sequelize.query(
        `
    SELECT * FROM Classes
    WHERE Center_Id = ${Center_Id}
    AND Schedule_Date = '${Date}'
  `,
        {
            type: QueryTypes.SELECT,
        }
    );

    return Class;
};

export async function FindConflictClassByDates(
    StartDate: any,
    EndDate: Date,
    CenterId: number
): Promise<boolean> {
    const [result] = await sequelize.query(
        `
    SELECT EXISTS  (
     SELECT 1 FROM Classes
     WHERE Center_Id = :centerid
     AND Schedule_Date < :endDate
     AND EndDate > :startDate
    ) AS hasConflict;
  `,
        {
            replacements: { startDate: StartDate, endDate: EndDate, centerid: CenterId },
            type: QueryTypes.SELECT,
        }
    );

    return Boolean((result as any).hasConflict);
};

export async function CancelClass(Class: Classes): Promise<void> {
    Class.Status = "CANCELLED";
    await Class.save();
};

