import mongoose from "mongoose";
import { Coupon } from "../model/cuoponModel.js";


export const createCoupon = async (req, res) => {
    try {
    
           const isCouponExist = await Coupon.findOne({ name:req.body.title});

        // if(!!isCardExist) {
        //     return res.status(400).json({ message: "card name is existing...Please enter another one" });
        // }

        const newCoupon = new Coupon(req.body)

        const createdCoupon = await newCoupon.save();
        return res.status(201).json({ data: createdCoupon, message: "Successfully inserted card data into db" });
    } catch (error) {
        return res.status(404).json({ message: error.message || 'error' });
    }
}


export const getCoupon = async (req, res) => {
    const Coupons = await Coupon.find()

    if(Coupon.length === 0) {
        return res.status(404).json("no entries yet");
    } else {
        return res.status(200).json({ Coupon: Coupons });
    }
}


export const getCouponById = async (req, res) => {
    const response = await mongoose.connection.collection("coupons").findOne({ _id: new mongoose.Types.ObjectId(req.params.id) });

    if(response) {
        return res.status(200).json({ Coupon: response });
    }else {
        return res.status(404).json("no entries yet");
    }
}


export const deleteCouponById = async (req, res) => {
    try {
        if(!req.params.id) {
            return res.status(400).json({ message: "error while deleting!!!" });
        }
        await Coupon.findByIdAndDelete(req.params.id)
        return res.status(200).json({ message: "deleted" });
    } catch(error) {
        return res.status(200).json({ message: error.message || 'error' });
    }
}


export const updateCouponById = async (req, res) => {
    console.log(req.params.id);

    try {
        if(!req.params.id) {
            return res.status(400).json({ message: 'error while deleting!' });
        }

        await Coupon.findByIdAndUpdate(req.params.id,{$set:req.body});
        return res.status(200).json({ message: "updated" });
    } catch (error) {
        return res.status(400).json({ message: error.message || "updation error" })
    }
}