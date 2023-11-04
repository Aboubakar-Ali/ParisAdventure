import mongoose, {Document, Schema} from "mongoose";

export interface Restaurants {
    name: string;
    address: string;
    note: number;
    price_min: number;
    price_max: number;
}

export interface RestaurantsDocument extends Restaurants, Document {}

const RestaurantsSchema = new Schema({
    name: {type: String, required: true},
    address: {type: String, required: true},
    note: {type: Number, required: true},
    price_min: {type: Number, required: true},
    price_max: {type: Number, required: true},
});

export default mongoose.model<RestaurantsDocument>("Restaurants", RestaurantsSchema);