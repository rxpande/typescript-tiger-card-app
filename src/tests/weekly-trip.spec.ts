import "jasmine";
import { weeklyTrips } from "../model/weekly-trips.input";
import { getWeeklyFare } from "../model/getWeeklyFare.function";

describe("Weekly Trip Unit Test", () => {
    
    it("should work", () => {
        const weeklyTripDetails = getWeeklyFare(weeklyTrips);
        expect(weeklyTripDetails).toBeDefined();
    });

    it("should work and calculate weekly fare", () => {
        const weeklyTripDetails = getWeeklyFare(weeklyTrips);
        expect(weeklyTripDetails).toBeDefined();
        expect(weeklyTripDetails.totalCalculatedFare).toBe(720);
    });
});