import User from "../db/models/User";
import { UserDTO, UpdateUserFiledDTO, DeleteUserDTO, newUserDTO } from "../dto/user.dto";
import { BadRequestError, NotFoundError } from "../utils/error/app.error";
import { formatPhoneNumber } from "../utils/helper/NumberFormate.helper";
import { UniqueConstraintError } from "sequelize";
import logger from "../config/logger.config";

export async function CreateUser(userdata: UserDTO): Promise<newUserDTO> {
    try {
        const user = await User.create({
            name: userdata.name,
            email: userdata.email ?? null,
            password: userdata.password,
            phone_number: userdata.phone_number,
        });
        logger.info("Create New User ", user);
        return {
            name: user.name,
            id: user.id,
        };
    } catch (error) {
        if (error instanceof UniqueConstraintError) {
            throw new BadRequestError("Email already exists");
        };
        throw error;
    };
};

export async function UpdateUser(userData: UpdateUserFiledDTO): Promise<string> {
    try {
        const user = await FindUserByPK(userData.id);

        if (userData.phone_number) {
            userData.phone_number = await formatPhoneNumber(userData.phone_number, userData.CountryCode);
        };

        user.name = userData.name || user?.name;

        await user.save();
        logger.info("Updated User ", user);
        return user.name;
    } catch (error) {
        throw error;
    };
};

export async function DeleteUser(userdata: DeleteUserDTO): Promise<void> {
    try {
        const user = await FindUserByPK(userdata.id);
        user.Deleted_At = new Date();
        await user.save();
        logger.info("Deleted User ", user);
    } catch (error) {
        throw error;
    };
};

export async function FindUserByPK(id: number): Promise<User> {
    const user = await User.findOne({
        where: {
            id,
            Deleted_At: null,
        },
    });

    if (!user) {
        throw new NotFoundError("User Not Found");
    };

    return user;
};

export async function IsAdmin(id: number): Promise<boolean> {
    const user = await FindUserByPK(id);
    return user.role == "admin";
};

export async function IncreaseUserBookingCount(userid: number): Promise<void> {
    const user = await FindUserByPK(userid);
    user.MaxBooking += 1;
    await user.save();
};
