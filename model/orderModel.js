import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({

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
    paymentId: {
        type: mongoose.Schema.Types.ObjectId,
        // required: [true, "Please add the product id"]
    },
    mode: {
        type: String,
        required: [true, "Please add the mode "]
    },
    status: {
        type: String,
        enum: ["pending", "shipped","accepted","approved", "delivered"],
        default: "pending",
    },
    productsArray: {
        type:Array
    }
},
    {
        timestamps: true
    }
);
export const Order= mongoose.model("Order", orderSchema);