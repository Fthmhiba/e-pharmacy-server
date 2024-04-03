import mongoose from "mongoose";

const wishlistSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
    },
    
},
    {
        timestamps: true,
    }
);

export const Wishlist = mongoose.model("wishlist", wishlistSchema);