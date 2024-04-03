import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please add the product name"]
    },
    details: {
        type: String,
        required: [true, "Please add the product details"]
    },
    price: {
        type: Number,
        required: [true, "Please add the product price"]
    },
    delivery: {
        type: String,
        required: [true, "Please add the product delivery"]
    },
    image:[{
        image:String
    }],
    mainImage:{
        type:String,
    },
    dropdown:{
        type:mongoose.Types.ObjectId,
    },
    

},
    {
        timestamps: true,
    }
);

export const Products = mongoose.model("Product", productSchema);
