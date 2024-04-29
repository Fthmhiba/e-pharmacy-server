import mongoose from "mongoose";

const couponSchema = new mongoose.Schema({
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
    code: {
        type: String,
    },
    
},
    {
        timestamps:true
    }
);

export const Coupon = mongoose.model("Coupon", couponSchema);