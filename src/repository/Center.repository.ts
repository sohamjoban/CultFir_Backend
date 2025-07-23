import Center from "../db/models/Center";
import { CenterDTO, UpdateCenterDTO } from "../dto/Center.dto";
import { NotFoundError } from "../utils/error/app.error";

export async function CreateCenter(CenterData: CenterDTO): Promise<Center> {
    try {
        const NewCenter = await Center.create({
            name: CenterData.name,
            address: CenterData.adderess,
        });
        return NewCenter;
    } catch (error) {
        throw error;
    };
};

export async function UpdateCenter(CenterData: UpdateCenterDTO): Promise<Center> {
    const Center = await GetCenterByPK(CenterData.CenterID);

    Center.name = CenterData.name || Center.name;
    Center.address = CenterData.adderess || Center.address;

    await Center.save();

    return Center;
};

async function GetCenterByPK(id: number): Promise<Center> {
    const MyCenter = await Center.findByPk(id);

    if (!MyCenter) {
        throw new NotFoundError("Center Not Found");
    };

    return MyCenter;
};

export async function DeleteCenter(Center_Id: number): Promise<string> {
    const Center = await GetCenterByPK(Center_Id);
    Center.Deleted_At = new Date();
    await Center.save();
    return Center.name;
};
