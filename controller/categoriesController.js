
import mongoose from "mongoose";
import { Category } from "../model/categoriesModel.js";


export const createCategory = async (req, res) => {
    try {
        const { name, description } = req.body;

        if(!name) {
            return res.status(400).json({ message: "product name is missing" });
        }
        // if(!description) {
        //     return res.status(400).json({ message: "description is missing" });
        // }
       
        const isCategoryExist = await Category.findOne({ name:req.body.name});

        if(!!isCategoryExist) {
            return res.status(400).json({ message: "category name is existing...Please enter another one" });
        }

        const newCategory = new Category(req.body)

        const createdCategory = await newCategory.save();
        return res.status(201).json({ data: createdCategory, message: "Successfully inserted product into db" });
    } catch (error) {
        return res.status(404).json({ message: error.message || 'error' });
    }
}


export const getCategory = async (req, res) => {
    const Categories = await Category.find()

    if(Categories.length === 0) {
        return res.status(404).json("no entries yet");
    } else {
        return res.status(200).json({ Category: Categories });
    }
}


export const getCategoryById = async (req, res) => {
    const response = await mongoose.connection.collection("category").findOne({ _id: new mongoose.Types.ObjectId(req.params.id) });

    if(response) {
        return res.status(200).json({ Category: response });
    }else {
        return res.status(404).json("no entries yet");
    }
}


export const deleteCategoryById = async (req, res) => {
    try {
        if(!req.params.id) {
            return res.status(400).json({ message: "error while deleting!!!" });
        }
        await Category.findByIdAndDelete(req.params.id)
        return res.status(200).json({ message: "deleted" });
    } catch(error) {
        return res.status(200).json({ message: error.message || 'error' });
    }
}


export const updateCategoryById = async (req, res) => {
    // console.log(req.params.id);

    try {
        if(!req.params.id) {
            return res.status(400).json({ message: 'error while deleting!' });
        }

        await Category.findByIdAndUpdate(req.params.id,{$set:req.body});
        return res.status(200).json({ message: "updated" });
    } catch (error) {
        return res.status(400).json({ message: error.message || "updation error" })
    }
}
