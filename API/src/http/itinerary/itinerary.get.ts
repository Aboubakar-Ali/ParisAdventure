import express from "express";
import Restaurants from "../../database/models/Restaurants";
import Activities from "../../database/models/Activities";

export default {
    name: "/user/get",
    description: "Get a user",
    method: "GET",
    run: async (req: express.Request, res: express.Response) => {
        try {
            const {position, hours, price, adults, button} = req.body

            if (!position || !hours || !price || !adults || !button) throw "Badly formatted"

            // get all activities, restaurants from database
            const activities = await Activities.find({})
            const restaurants = await Restaurants.find({})
            // calculate the best itinerary


            // return the best itinerary
            res.status(200)
            res.send("Test route response");


        }

        catch(err) {
            res.status(400)
            res.send("Test route response");
        }
    }
}