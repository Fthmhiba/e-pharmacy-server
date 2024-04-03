import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    userFname: {
        type: String,
        required: [true, "Please add the firstname"],
    },
    userLname: {
        type: String,
        required: [true, "Please add the lastname"],
    },
    userEmail: {
        type: String,
        required: [true, "Please add the email address"],
    },
    userPassword: {
        type: String,
        required: [true, "Please add the user password"],
    },
    isUser:{
        type:Boolean,
        default:true
    }
},
    {
        timestamps: true,
    }
);

export const User = mongoose.model("User", userSchema);