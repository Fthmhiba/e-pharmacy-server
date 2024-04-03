import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    orderId: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "Please add the Order Id"]
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "Please add the product id"]
    },
    cartId: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "Please add the Order Id"]
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "Please add the product id"]
    },
    mode: {
        type: String,
        required: [true, "Please add the mode "]
    }
},
    {
        timestamps: true
    }
);
export const Order= mongoose.model("Order", orderSchema);