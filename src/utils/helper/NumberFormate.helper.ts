import { CountryCode, parsePhoneNumberFromString } from "libphonenumber-js";
import { BadRequestError } from "../error/app.error";

export async function ConvertNumberToE164format(number: string, countCode: CountryCode = "IN") {
    try {
        const phone = parsePhoneNumberFromString(number, countCode);
        if (phone && phone.isValid()) {
            return phone.number;
        };
    } catch (error) {
        console.error(`Error Happen To convert the number ${error}`);
        throw error;
    };
};

export async function formatPhoneNumber(phone: string, countryCode: CountryCode = "IN") {
    const formatted = await ConvertNumberToE164format(phone, countryCode);
    if (typeof formatted != 'string') {
        throw new BadRequestError("Invalid Phone Number");
    };
    return formatted;
};
