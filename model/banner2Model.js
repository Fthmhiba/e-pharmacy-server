import mongoose from "mongoose";

const banner2Schema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Please add title"]
    },
    description: {
        type: String,
        required: [true, "Please add description about it"]
    },
    percentage: {
        type: String,
        required: [true, "Please add timeline"]
    },
    rate: {
        type: String,
        required: [true, "Please add rate"]
    },
    offerRate: {
        type: String,
        required: [true, "Please add offer-rate"]
    },
    image:{
        type:String,
    }
},
    {
        timestamps: true,
    }
);

export const Banner2 = mongoose.model("Banner2", banner2Schema);