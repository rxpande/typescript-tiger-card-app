export interface ITrip {
    day: string;
    explanation?: string;
    calculatedFare?: number;
}

export interface IDailyTrip extends ITrip {
    time: number,
    fromZone: number
    toZone: number,
}

export interface IWeeklyTrip extends ITrip {
    zones: string,
}