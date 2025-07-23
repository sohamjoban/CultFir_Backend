import { Op, QueryTypes, Sequelize } from "sequelize";
import HolyDay from "../db/models/Holyday";
import sequelize from "../db/models/sequelize";
import { HolyDayDTO } from "../dto/Holyday.dto";
import { ApiError, BadRequestError } from "../utils/error/app.error";
import { InternalServerError } from "../middleware/error.middleware";

export async function CreateHolyday(HolyDayData: HolyDayDTO): Promise<void> {
    try {
        await HolyDay.create({
            userId: HolyDayData.id,
            CenterId: HolyDayData.centerId,
            Date: HolyDayData.date
        });
    } catch (error) {
        throw error;
    };
};

export async function FindConflictHolyDayByDates(date: Date, CenterId: number): Promise<boolean> {
    const HolyDayDate = new Date(date).toISOString().split("T")[0];

    const [result] = await sequelize.query(`
    SELECT EXISTS (
      SELECT 1
      FROM HolyDay
      WHERE CenterId = :centerid
      AND DATE(Date) = :date
    ) AS hasConflict;
  `, {
        replacements: { date: HolyDayDate, centerid: CenterId },
        type: QueryTypes.SELECT
    });

    return Boolean((result as any).hasConflict);
};

export async function IsHolydayAlredyDeclare(CenterId: number, date: string): Promise<boolean> {
    try {
        const latestHolyday = await HolyDay.findOne({
            where: {
                CenterId: CenterId,
                Deleted_At: null,
                [Op.and]: Sequelize.where(
                    Sequelize.fn("DATE", Sequelize.col("Date")),
                    date
                )
            },
        });
        return !!latestHolyday;
    } catch (error) {
        console.error(error);
        throw error;
    };

};