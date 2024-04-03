import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
    },
    quantity:{
        type:Number,
        default:1
    }
},
    {
        timestamps: true,
    }
);

export const Cart = mongoose.model("Cart", cartSchema);