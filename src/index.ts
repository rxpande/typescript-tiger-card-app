import { dailyTrips } from "./model/daily-trips.input";
import { weeklyTrips } from "./model/weekly-trips.input";

import { getDailyFare } from "./model/getDailyFare.function";
import { getWeeklyFare } from "./model/getWeeklyFare.function";

const dailyTripDetails = getDailyFare(dailyTrips);
const weeklyTripDetails = getWeeklyFare(weeklyTrips);

console.log("Daily Trip Details");
console.table(dailyTripDetails.dailyTrips);
console.log("Total Fare", dailyTripDetails.dailyTotalFare);

console.log("Weekly Trip Details");
console.table(weeklyTripDetails.weeklyTrips);
console.log("Total Fare", weeklyTripDetails.totalCalculatedFare);
