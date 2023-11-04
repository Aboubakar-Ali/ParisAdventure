import mongoose, {Document, Schema} from "mongoose";

export interface Activities {
    name: string;
    price: number;
    time: number;
    address: string;
    note: number;
    Open: number;
    Close: number;
}

export interface ActivitiesDocument extends Activities, Document {}

const ActivitiesSchema = new Schema({
    name: {type: String, required: true},
    price: {type: Number, required: true},
    time: {type: Number, required: true},
    address: {type: String, required: true},
    note: {type: Number, required: true},
    Open: {type: Number, required: true},
    Close: {type: Number, required: true},
});

export default mongoose.model<ActivitiesDocument>("Activities", ActivitiesSchema);