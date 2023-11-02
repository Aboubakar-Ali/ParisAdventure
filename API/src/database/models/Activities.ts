import mongoose, {Document, Schema} from "mongoose";

export interface Activities {
    nom: string;
    open: string;
    addresse: string;

    note: string;
    prix: string;
}

export interface ActivitiesDocument extends Activities, Document {}

const ActivitiesSchema = new Schema({
    nom: {type: String, required: true, unique: true},
    addresse: {type: String, required: true},

    note: {type: String, required: true},
    prix: {type: String, required: true},
});

export default mongoose.model<ActivitiesDocument>("Activities", ActivitiesSchema);