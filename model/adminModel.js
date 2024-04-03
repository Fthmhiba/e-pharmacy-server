import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
    fname: {
        type: String,
        required: [true, "Please add the firstname"],
    },
    lname: {
        type: String,
        required: [true, "Please add the lastname"],
    },
    email: {
        type: String,
        required: [true, "Please add the email address"],
    },
    password: {
        type: String,
        required: [true, "Please add the user password"],
    },
    isAdmin:{
        type:Boolean,
        default:true
    },
    profile:{
        type:String,
    },
},
    {
        timestamps: true,
    }
);

export const Admin = mongoose.model("Admin", adminSchema);
