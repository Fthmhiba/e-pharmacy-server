import mongoose from "mongoose";
import { Wishlist } from "../model/wishlistModel.js";


export const addToWishlist = async (req, res) => {
    try {

        const isExistProduct = await Wishlist.findOne({
            productId: new mongoose.Types.ObjectId(req.body.productId),
            userId: new mongoose.Types.ObjectId(req.body.userId)
        })


        if (isExistProduct) {
            return res.status(201).json({  message: 'Already exist in wishlist' });

        } else {

            const newData = new Wishlist(req.body)
            const saveData = await newData.save();
            if (saveData) {
                return res.status(201).json({ result: saveData, message: 'successfully inserted data into db' });
            }

        }
    }
    catch (error) {
        return res.status(404).json({ message: error.message || 'error' });
    }
}


export const listWishlistByUser = async (req, res) => {
    // console.log(req.params.id, 'req.body.userId');
    const wishlist = await Wishlist.aggregate([
        {
            $match: { userId: new mongoose.Types.ObjectId(req.params.id) }
        },
        {
            $lookup: {
                from: "products",
                localField: "productId",
                foreignField: "_id",
                as: "productInfo"
            }
        },
        {
            $unwind: "$productInfo"
        },
    ])



    if (wishlist.length === 0) {
        return res.status(404).json("no entries yet");
    } else {
        return res.status(200).json({ data: wishlist });
    }
}


export const getById = async (req, res) => {
    const wishlist = await Wishlist.findById(req.params.id)

    if (wishlist) {
        return res.status(200).json({ data: wishlist });
    } else {
        return res.status(404).json("no entries yet");
    }
}

export const getAll = async (req, res) => {
    // console.log(req.params.id, 'req.body.userId');
   try {
    const getAll = await Wishlist.aggregate([
    
        {
            $lookup: {
                from: "products",
                localField: "productId",
                foreignField: "_id",
                as: "productInfo"
            }
        },
        {
            $unwind: "$productInfo"
        },
    ])

        return res.status(200).json({ result : getAll });
   } catch (error) {
        console.log(error);
   }
    
}

export const removeWishlist = async (req, res) => {
    try {
        // Find and remove the cart item by productId and userId
        const removedItem = await Wishlist.findOneAndDelete(
            { productId: new mongoose.Types.ObjectId(req.params.productId), userId: req.params.userId } // Assuming req.user contains the user's ID
        );

        if (!removedItem) {
            return res.status(404).json({ message: 'Wishlist item not found' });
        }

        return res.status(200).json({ data: removedItem, message: 'Item removed from wishlist successfully' });
    } catch (error) {
        return res.status(500).json({ message: error.message || 'Internal server error' });
    }
};




