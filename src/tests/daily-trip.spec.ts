import "jasmine";
import { dailyTrips } from "../model/daily-trips.input";
import { getDailyFare } from "../model/getDailyFare.function";

describe("Daily Trip Unit Test", () => {
    
    it("should work", () => {
        const dailyTripDetails = getDailyFare(dailyTrips);
        expect(dailyTripDetails).toBeDefined();
        expect(dailyTripDetails.dailyTotalFare).toBe(120);
    });

    it("should work and calculate daily fare", () => {
        const dailyTripDetails = getDailyFare(dailyTrips);
        expect(dailyTripDetails).toBeDefined();
        expect(dailyTripDetails.dailyTotalFare).toBe(120);
    });
});