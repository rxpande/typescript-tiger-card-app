import { FARE } from "./fare";
import { TRIP_TYPE } from "./trip-type";
import { TRIP_ZONE } from "./trip-zone";
import { DAILY_CAP } from "./daily-cap";
import { IDailyTrip } from "./trip.config";
import { TRIP_ZONE_TYPE } from "./trip-zone-type";
import { TRIP_EXPLANATION } from "./trip-explanation";

export function getDailyFare(dailyTrips: IDailyTrip[]) {

    let fare: number = FARE.DEFAULT;
    let dailyCap: number = FARE.DEFAULT;
    let dailyTotalFare: number = FARE.DEFAULT;
    let tripExplanation: string = TRIP_EXPLANATION.DEFAULT;

    dailyTrips.forEach( (trip: IDailyTrip) => {

        const zone: string = trip.fromZone === trip.toZone
            ? TRIP_ZONE_TYPE.SAME_ZONE
            : TRIP_ZONE_TYPE.DIFFERENT_ZONE;

        const journeyType: string = (trip.time > 7 &&  trip.time < 10.30) || (trip.time > 17.00 &&  trip.time < 20.00)
            ? TRIP_TYPE.PEAK_HOUR_JOURNEY
            : TRIP_TYPE.NORMAL_JOURNEY;

        if( journeyType === TRIP_TYPE.PEAK_HOUR_JOURNEY ) {
            if(zone === TRIP_ZONE_TYPE.SAME_ZONE) {
                fare = FARE.THIRTY;
            } else {
                fare = FARE.THIRTY_FIVE;
            }
            tripExplanation = TRIP_EXPLANATION.PEAK_HOURS_SINGLE_FARE;
        } else {
            if(zone === TRIP_ZONE_TYPE.SAME_ZONE) {
                fare = FARE.TWENTY_FIVE;
            } else {
                fare = FARE.THIRTY;
            }
            tripExplanation = TRIP_EXPLANATION.OFF_PEAK_SINGLE_FARE;
        }

        // Calculate Dynamic Daily Cap based on each trip
        if(trip.fromZone === TRIP_ZONE.TWO && trip.toZone === TRIP_ZONE.TWO) {
            if( DAILY_CAP.EIGHTY > dailyCap) {
                dailyCap = DAILY_CAP.EIGHTY;
            }
        } else if(trip.fromZone === TRIP_ZONE.ONE && trip.toZone === TRIP_ZONE.ONE) {
            if( DAILY_CAP.ONE_HUNDRED > dailyCap) {
                dailyCap = DAILY_CAP.ONE_HUNDRED;
            }
        } else if (trip.fromZone !== trip.toZone ){
            if( DAILY_CAP.ONE_HUNDRED_TWENTY > dailyCap) {
                dailyCap = DAILY_CAP.ONE_HUNDRED_TWENTY;
            }
        }

        if( dailyTotalFare + fare >= dailyCap ) {
            const originalFare = fare;
            fare = dailyCap - dailyTotalFare;
            tripExplanation = `${TRIP_EXPLANATION.THE_DAILY_CAP_REACHED} ${dailyCap} for zone ${trip.fromZone} - ${trip.toZone}. Charged ${fare} instead of ${originalFare}`
        }

        dailyTotalFare += fare;
        trip.explanation = tripExplanation
        trip.calculatedFare = fare;
    });

    return {
        dailyTrips,
        dailyTotalFare
    }
}
