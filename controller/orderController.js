import mongoose from "mongoose";
import { Products } from "../model/productModel";
import { Order } from "../model/orderModel";


export const createOrder =async (req, res) => {
    try {
        const { userId, productId } = req.body

        if (!productId) {
            return res.status(400).json({ message: "productId is missing" })
        }
        if (!userId) {
            return res.status(400).json({ message: "userId is missing" })
        }

        const id = Math.random().toString(16).slice(2)
    

        const isProduct = await Products.findById(req.body.productId)

     
        if(!isProduct){
            return res.status(400).json({ message:'product is not existing' })
        }


        const newOrder = new Order({
            productId,
            userId
        })

        const orderSaved = await newOrder.save() 
        
        return res.status(201).json({ data:orderSaved,message: 'successfully ordered' });

    } catch (error) {
        return res.status(404).json({ message: error.message || 'error' });      
    }
}

export const getOrders = async (req, res) => {

    const or = await Order.find()
    console.log(req.headers.authorization);
    // return true

    if(!req.headers.authorization){
        return res.status(404).json({message: 'error...' });  
    }
        jwt.verify(req.headers.authorization, process.env.JWT_SECRET_KEY,async function(err, decoded) {
                        console.log(decoded)
                        
                    if(err){
                        return res.status(404).json({ message: err.message || 'error...' });  
                    }

                    console.log(or)
                    // return true

                    const orders= await Order.aggregate([
                        {
                            $match:{userId:new mongoose.Types.ObjectId(decoded.userId) }
                        },
                        {
                            $lookup:{
                                from:"products",
                                localField:"productId",
                                foreignField:"_id",
                                as:"products"
                            }
                        }
                    ])
                    // return true
                    // console.log(orders,'orders')
                    const count= await Order.countDocuments();


                if (orders.length === 0) {
                    return res.status(200).json({ products:orders });
                } else {
                    return res.status(200).json({ products: orders,count:count });
                }
})
  
}