import { RRule, Weekday } from "rrule";
import { RecurringDatesDTO, WeekdayKey } from "../../dto/Recurring.dto";

export const weekdayMap: Record<WeekdayKey, Weekday> = {
    MO: RRule.MO,
    TU: RRule.TU,
    WE: RRule.WE,
    TH: RRule.TH,
    FR: RRule.FR,
    SA: RRule.SA,
    SU: RRule.SU
};

export function GenerateRecurringDates(RecurDate: RecurringDatesDTO) {

    const rule = new RRule({
        freq: RRule.WEEKLY,
        dtstart: new Date(RecurDate.StartDate),
        until: new Date(RecurDate.EndDate),
        byweekday: RecurDate.WeekDay.map((day) => weekdayMap[day])

    });

    return rule.all();
};