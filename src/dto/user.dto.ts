import { CountryCode } from "libphonenumber-js";

export type UserDTO = {
    name: string,
    email?: string,
    password: string,
    phone_number: string,
    CountryCode?: CountryCode
};

export type UpdateUserFiledDTO = {
    id: number,
    name: string,
    phone_number: string,
    CountryCode?: CountryCode
};

export type DeleteUserDTO = {
    id: number
};

export type newUserDTO = {
    name: string,
    id: number
};
