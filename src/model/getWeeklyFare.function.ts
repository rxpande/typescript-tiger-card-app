import { FARE } from "./fare";
import { TRIP_ZONE } from "./trip-zone";
import { WEEKLY_CAP } from "./weekly-cap";
import { IWeeklyTrip } from "./trip.config";
import { TRIP_EXPLANATION } from "./trip-explanation";

export function getWeeklyFare(weeklyTrips: IWeeklyTrip[]) {
 
    let fare: number = FARE.DEFAULT;
    let weeklyCap: number = WEEKLY_CAP.DEFAULT;
    let calculatedDays: string[] = [];
    let totalWeeklyFare: number = FARE.DEFAULT;
    let tripExplanation: string = TRIP_EXPLANATION.DEFAULT;
    let totalCalculatedFare = FARE.DEFAULT;

    weeklyTrips.forEach( (trip: IWeeklyTrip) => {

        // Calculate Daily Fare
        if(trip.zones === TRIP_ZONE.TWO_TO_TWO) {
            fare = FARE.ONE_HUNDRED;
            tripExplanation = TRIP_EXPLANATION.DAILY_CAP_NOT_REACHED;
        } else if (trip.zones === TRIP_ZONE.ONE_TO_ONE ) {
            fare = FARE.EIGHTY;
            tripExplanation = TRIP_EXPLANATION.DAILY_CAP_NOT_REACHED;
        } else if(trip.zones === TRIP_ZONE.ONE_TO_TWO || trip.zones === TRIP_ZONE.TWO_TO_ONE){
            fare = FARE.ONE_HUNDRED_TWENTY;
            tripExplanation = TRIP_EXPLANATION.DAILY_CAP_REACHED;
        }
        
        // Calculate Dynamic Weekly Cap based on each trip
        if(trip.zones === TRIP_ZONE.TWO_TO_TWO) {
            if(WEEKLY_CAP.FOUR_HUNDRED > weeklyCap) {
                weeklyCap = WEEKLY_CAP.FOUR_HUNDRED;
            }
        } else if (trip.zones === TRIP_ZONE.ONE_TO_ONE ) {
            if(WEEKLY_CAP.FIVE_HUNDRED > weeklyCap) {
                weeklyCap = WEEKLY_CAP.FIVE_HUNDRED;
            }
        } else if(trip.zones === TRIP_ZONE.ONE_TO_TWO || trip.zones ===  TRIP_ZONE.TWO_TO_ONE){
            if(WEEKLY_CAP.SIX_HUNDRED > weeklyCap) {
                weeklyCap = WEEKLY_CAP.SIX_HUNDRED;
            }
        }
        
        if(calculatedDays.includes(trip.day) ) {
            totalWeeklyFare = fare;
            tripExplanation = TRIP_EXPLANATION.NEW_WEEK_STARTED;
        }  else {
            calculatedDays.push(trip.day);
        }

        if( totalWeeklyFare + fare >= weeklyCap ) {
            fare = weeklyCap - totalWeeklyFare;
            tripExplanation = `A weekly cap of ${weeklyCap} reached`
        }

        totalWeeklyFare += fare;
        trip.explanation = tripExplanation;
        totalCalculatedFare += fare;
        trip.calculatedFare = fare;
    });

    return {
        weeklyTrips,
        totalCalculatedFare
    }
}