import Center from "../db/models/Center";
import { CenterDTO, UpdateCenterDTO } from "../dto/Center.dto";
import { CreateCenter, UpdateCenter, DeleteCenter } from "../repository/Center.repository";
import { FindClassByCenterId } from "../repository/Classes.repository";
import { BadRequestError } from "../utils/error/app.error";

export async function CreateCenterService(CenterData: CenterDTO): Promise<Center> {
    const Center = await CreateCenter(CenterData);
    return Center;
};

export async function UpdateCenterService(CenterData: UpdateCenterDTO): Promise<Center> {
    const Center = await UpdateCenter(CenterData);
    return Center;
};

export async function DeleteCenterService(Center_Id: number): Promise<string> {
    // Check If Class Are Schedule If Yes So We Do Not Delete Class
    let IsClassSchedule = await FindClassByCenterId(Center_Id);
    if (IsClassSchedule) {
        throw new BadRequestError("Class Schedule On This Center So Unable To Delete It");
    };
    const Center = await DeleteCenter(Center_Id);
    return Center;
};