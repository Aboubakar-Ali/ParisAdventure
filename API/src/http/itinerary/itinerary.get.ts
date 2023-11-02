import express from "express";

export default {
    name: "/user/get",
    description: "Get a user",
    method: "GET",
    run: async (req: express.Request, res: express.Response) => {
        try {
            const {position, hours, price, adults, button} = req.body

            if (!position || !hours || !price || !adults || !button) throw "Badly formatted"

            // get activities, restaurants from database

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