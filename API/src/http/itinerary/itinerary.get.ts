import express from "express";
import Restaurants from "../../database/models/Restaurants";
import Activities from "../../database/models/Activities";
import Logger from "../../logger";

export default {
    name: "/itinerary/get",
    description: "Get an itinerary based on the user's preferences",
    method: "POST",
    run: async (req: express.Request, res: express.Response) => {
        try {
            var { adults, hours, position, price } = req.body;
            if (!position || !hours || !price || !adults) throw "Badly formatted";

            // get all activities, restaurants from database
            const activities = await Activities.find({});
            const restaurants = await Restaurants.find({});

            if (!activities || !restaurants) throw "No activities or restaurants found";

            // SORTING
            const bestItinerary: Array<typeof Activities | typeof Restaurants> = [];

            //sort activities and restaurants by rating (note)
            activities.sort((a, b) => (a.note < b.note ? 1 : -1));

            //randomize activities order that have the same rating OR CHOOSE THE ONE THAT ARE THE CLOSEST TO THE POSITION OF THE USER AT EACH STEP
            activities.sort((a, b) => (a.note == b.note ? Math.random() - 0.5 : 0));

            //sort restaurants by rating (note)
            restaurants.sort((a, b) => (a.note < b.note ? 1 : -1));

            //randomize restaurants order that have the same rating OR CHOOSE THE ONE THAT ARE THE CLOSEST TO THE POSITION OF THE USER AT EACH STEP
            restaurants.sort((a, b) => (a.note == b.note ? Math.random() - 0.5 : 0));

            // for each activity, check if it fits the user's preferences (hours, price)
            for (const activity of activities) {
                // Check if the activity fits the user's preferences
                if (activity.time > hours-2 || activity.price*adults > price || activity.time == 0) {
                    continue;
                }

                // Add the activity to the itinerary
                bestItinerary.push(activity as any);

                // Calculate the remaining hours and price
                hours -= activity.time;
                price -= activity.price*adults;

                break;
            }

            // Check if there is a restaurant that fits the user's preferences
            for (const restaurant of restaurants) {
                // Check if the restaurant fits the user's preferences
                if (restaurant.price_min*adults > price) {
                    continue;
                }

                // Add the restaurant to the itinerary
                bestItinerary.push(restaurant as any);

                // Calculate the remaining price
                price -= restaurant.price_min*adults;
                // Calculate the remaining hours
                hours -= 2;

                break;
            }

            if (!bestItinerary) throw "No best itinerary found";

            Logger.info(`Best itinerary found: ${bestItinerary}`);
            res.status(200);
            res.send({bestItinerary, hours, price});
        } catch (err) {
            res.status(400);
            res.send("An error occured");
        }
    }
};