import mongoose from "mongoose";

const categoriesSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please add category name"]
    },
    description: {
        type: String
    },
},
    {
        timestamps: true
    }
);

export const Category = mongoose.model("Category", categoriesSchema)