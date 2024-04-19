import mongoose from "mongoose";
import { Cart } from "../model/cartModel.js";


export const addToCart = async (req, res) => {
    try {

        const isExistProduct = await Cart.findOne({
            productId: new mongoose.Types.ObjectId(req.body.productId),
            userId: new mongoose.Types.ObjectId(req.body.userId)
        })


        if (isExistProduct) {
            const copy = { ...isExistProduct._doc }
            console.log(copy);
            copy.quantity = copy.quantity + 1
            const saveData = await Cart.findByIdAndUpdate(isExistProduct._id, { $set: copy }, { new: true })
            return res.status(201).json({ result: saveData, message: 'incremented' });

        } else {

            const newData = new Cart(req.body)
            const saveData = await newData.save();
            if (saveData) {
                return res.status(201).json({ result: saveData, message: 'successfully inserted user into db' });
            }

        }
    }
    catch (error) {
        return res.status(404).json({ message: error.message || 'error' });
    }
}


export const listCartByUser = async (req, res) => {
    // console.log(req.params.id, 'req.body.userId');
    const cart = await Cart.aggregate([
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



    if (cart.length === 0) {
        return res.status(404).json("no entries yet");
    } else {
        return res.status(200).json({ data: cart });
    }
}


export const getById = async (req, res) => {
    const cart = await Cart.findById(req.params.id)

    if (cart) {
        return res.status(200).json({ data: cart });
    } else {
        return res.status(404).json("no entries yet");
    }
}

export const getAll = async (req, res) => {
    // console.log(req.params.id, 'req.body.userId');
    try {
        const getAll = await Cart.aggregate([

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

        return res.status(200).json({ result: getAll });
    } catch (error) {
        console.log(error);
    }

}

export const removeCartQuantity = async (req, res) => {
    try {
        // Find and remove the cart item by productId and userId
        const removedItem = await Cart.findOneAndDelete(
            { productId: new mongoose.Types.ObjectId(req.params.productId), userId: req.params.userId } // Assuming req.user contains the user's ID
        );

        if (!removedItem) {
            return res.status(404).json({ message: 'Cart item not found' });
        }

        return res.status(200).json({ data: removedItem, message: 'Item removed from cart successfully' });
    } catch (error) {
        return res.status(500).json({ message: error.message || 'Internal server error' });
    }
};

export const decrementCartQuantity = async (req, res) => {
    try {
        const cartItem = await Cart.findOneAndUpdate(
            { productId: new mongoose.Types.ObjectId(req.params.productId), userId: new mongoose.Types.ObjectId(req.params.userId) }, // Assuming req.user contains the user's ID
            { $inc: { quantity: -1 } }, // Increment quantity by 1
            { new: true } // Return the updated document
        );

        if (!cartItem) {
            return res.status(404).json({ message: 'Cart item not found' });
        }

        return res.status(200).json({ result: cartItem, message: 'Quantity incremented successfully' });
    } catch (error) {
        return res.status(500).json({ message: error.message || 'Internal server error' });
    }
};


export const incrementCartQuantity = async (req, res) => {

    try {
        if (!req.params.productId) return res.status(400).json({ message: "product id not provided" })
        if (!req.params.userId) return res.status(400).json({ message: "user id not provided" })

        const isExistProduct = await Cart.findOne({
            productId: new mongoose.Types.ObjectId(req.params.productId),
            userId: new mongoose.Types.ObjectId(req.params.userId)
        })


        if (isExistProduct) {
            const copy = { ...isExistProduct._doc }

            copy.quantity = copy.quantity + 1
            const saveData = await Cart.findByIdAndUpdate(isExistProduct._id, { $set: copy }, { new: true })
            return res.status(201).json({ result: saveData, message: 'incremented' });

        } else {

            return res.status(400).json({ message: 'cart not exist' });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message || 'Internal server error' });
    }
};