import mongoose from "mongoose";

const bannerSchema = new mongoose.Schema({
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

export const Banner = mongoose.model("Banner", bannerSchema);