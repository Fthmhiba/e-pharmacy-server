import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please add the firstname"],
    },
    address: {
        type: String,
        required: [true, "Please add the address"],
    },
    contact: {
        type: String,
        required: [true, "Please add the email address"],
    },
    city: {
        type: String,
        required: [true, "Please add the user password"],
    },
    pincode: {
        type: String,
        required: [true, "Please add the user password"],
    },
    state: {
        type: String,
        required: [true, "Please add the state"],
    },
    orderId: {
        type: mongoose.Schema.Types.ObjectId
    },
    amount:{
        type:String
    }
},
    {
        timestamps: true,
    }
);

export const Payment = mongoose.model("Payment", paymentSchema);