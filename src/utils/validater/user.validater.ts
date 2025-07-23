import { z } from "zod";
import { CountryCode, isSupportedCountry } from "libphonenumber-js";

const countryCodeSchema = z.string().refine(
    (val): val is CountryCode => isSupportedCountry(val),
    {
        message: "Invalid Country Code"
    }
).optional();

export const UserSchema = z.object({
    name: z.string().min(1),
    email: z.string().optional(),
    password: z.string().min(1),
    phone_number: z.string().min(1),
    CountryCode: countryCodeSchema
});

export const UpdateUserSchema = z.object({
    id: z.number(),
    name: z.string().min(1),
    phone_number: z.string().min(1),
    CountryCode: countryCodeSchema
});

export const DeleteUserSchema = z.object({
    id: z.number(),
});
