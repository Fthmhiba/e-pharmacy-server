import mongoose from "mongoose";

const offercardSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Please add Offer card title"]
    },
    description: {
        type: String,
        required: [true, "Please add description"]
    },
    timeline: {
        type: String,
    },
    offerRate: {
        type: String,
    },
    image:{
        type:String,
    }
},
    {
        timestamps:true
    }
);

export const Offercard = mongoose.model("Offercard", offercardSchema);