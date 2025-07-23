export type RecurringDatesDTO = {
    StartDate: Date,
    EndDate: Date,
    WeekDay: Array<WeekdayKey>
};

export type WeekdayKey = 'MO' | 'TU' | 'WE' | 'TH' | 'FR' | 'SA' | 'SU';
