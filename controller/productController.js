import mongoose from "mongoose";
import { Products } from "../model/productModel.js";


export const createProduct =async (req, res) => {

    try {
        const { name } = req.body;

        if(!name) {
            return res.status(400).json({ message: "product name is missing" });
        }
      
        const isProductExist = await Products.findOne({ name: req.body.name});

        // if(!!isProductExist) {
        //     return res.status(400).json({ message: "product name is existing...Please enter another one" });
        // }

        const newProduct = new Products(req.body)

        const createdProduct = await newProduct.save();
        return res.status(201).json({ data: createdProduct, message: "Successfully inserted product into db" });
    } catch (error) {
        return res.status(404).json({ message: error.message || 'error' });
    }
}

export const getProducts = async (req, res) => {
    const Product = await Products.aggregate([
        {
            $lookup:{
                from:"categories",
                localField:"dropdown",
                foreignField:"_id",
                as:"categoriesInfo"
            }
        },
        {
            $unwind: "$categoriesInfo"
        }
    ])
    // console.log(Product);

    if(Product.length === 0) {
        return res.status(404).json("no entries yet");
    } else {
        return res.status(200).json({ products: Product });
    }
}


export const getProductByCategory = async (req, res) => {

    const Product = await Products.find({dropdown:new mongoose.Types.ObjectId(req.params.id)})

    if(Product.length === 0) {
        return res.status(404).json("no entries yet");
    } else {
        return res.status(200).json({ products: Product });
    }
}

export const getProductById = async (req, res) => {
    const response = await Products.findOne({ _id: new mongoose.Types.ObjectId(req.params.id) });

    if(response) {
        return res.status(200).json({ Product: response });
    }else {
        return res.status(404).json("no entries yet");
    }
}

export const deleteProductById = async (req, res) => {

    try {
        if(!req.params.id) {
            return res.status(400).json({ message: "error while deleting!!!" });
        }
        await Products.findByIdAndDelete(req.params.id)
        return res.status(200).json({ message: "deleted" });
    } catch(error) {
        return res.status(200).json({ message: error.message || 'error' });
    }
}


export const updateProductById = async (req, res) => {

    console.log(req.params.id);

    // return true

    // const response = await mongoose.connection.collection("product").findOneAndUpdate({ _id: new mongoose.Types.ObjectId(req.params.id) },{$set:req.body})
    try {
        if(!req.params.id) {
            return res.status(400).json({ message: 'error while deleting!' });
        }

        await Products.findByIdAndUpdate(req.params.id,{$set:req.body});
        return res.status(200).json({ message: "updated" });
    } catch (error) {
        return res.status(400).json({ message: error.message || "updation error" })
    }
   
}

export const searchProduct = async (req, res) => {
    try {
        let filter = {};
        if (req?.query?.name) {
            filter = { name: { $regex: req.query.name, $options: 'i' } };
        } 

        const products = await Products.find(filter);
        return res.status(200).json({ result :products });
    } catch (error) {
        console.error('Error searching for products:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};
