import mongoose from "mongoose";

const cardSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Please add Offer card title"]
    },
    description: {
        type: String,
        required: [true, "Please add description"]
    },
    
    
    
},
    {
        timestamps:true
    }
);

export const Card = mongoose.model("Card", cardSchema);