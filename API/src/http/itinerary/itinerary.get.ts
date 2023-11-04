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
            const { adults, hours, position, price } = req.body;

            if (!position || !hours || !price || !adults) throw "Badly formatted";

            console.log(position, hours, price, adults);
            // get all activities, restaurants from database
            const activities = await Activities.find({});
            const restaurants = await Restaurants.find({});

            if (!activities || !restaurants) throw "No activities or restaurants found";

            // SORTING
            const bestItinerary: Array<typeof Activities | typeof Restaurants> = [];

            // sort activities and restaurants by distance (position)
            // TODO

            //sort activities and restaurants by rating (note)
            activities.sort((a: Activities, b: Activities) => {
                return b.note - a.note;
            });

            // restaurants.sort((a: Restaurants, b: Restaurants) => {
            //     return b.note - a.note;
            // });

            // for each activity, check if it fits the user's preferences (hours, price)
            for (const activity of activities) {
                // Check if the activity fits the user's preferences
                if (activity.time > hours || activity.price > price) {
                    continue;
                }

                // Check if the activity is already in the itinerary
                if (bestItinerary.includes(activity)) {
                    continue;
                }

                // Add the activity to the itinerary
                bestItinerary.push(activity);

                // Calculate the remaining hours and price
                hours -= activity.time;
                price -= activity.price;

                // Break if the user has no more hours or price remaining
                if (hours <= 0 || price <= 0) {
                    break;
                }
            }

            if (!bestItinerary) throw "No best itinerary found";

            Logger.info(`Best itinerary found: ${bestItinerary}`);
            res.status(200);
            res.send(bestItinerary);
        } catch (err) {
            res.status(400);
            res.send("Test route response");
        }
    }
};