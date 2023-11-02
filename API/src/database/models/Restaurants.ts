import mongoose, {Document, Schema} from "mongoose";

export interface Restaurants {
    nom: string;
    addresse: string;

    note: string;
    prix: string;
}

export interface RestaurantsDocument extends Restaurants, Document {}

const RestaurantsSchema = new Schema({
    nom: {type: String, required: true, unique: true},
    addresse: {type: String, required: true},

    note: {type: String, required: true},
    prix: {type: String, required: true},
});

export default mongoose.model<RestaurantsDocument>("Restaurants", RestaurantsSchema);