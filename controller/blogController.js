import mongoose from "mongoose";
import { Blog } from "../model/blogModel.js";


export const createBlog = async (req, res) => {
    try {
        const { title, description } = req.body;

        if(!title) {
            return res.status(400).json({ message: "blog name is missing" });
        }
        // if(!description) {
        //     return res.status(400).json({ message: "description is missing" });
        // }
       
        const isBlogExist = await Blog.findOne({ title:req.body.title});

        // if(!!isBlogExist) {
        //     return res.status(400).json({ message: "blog name is existing...Please enter another one" });
        // }

        const newBlog = new Blog(req.body)

        const createdBlog = await newBlog.save();
        return res.status(201).json({ data: createdBlog, message: "Successfully inserted blog into db" });
    } catch (error) {
        return res.status(404).json({ message: error.message || 'error' });
    }
}


export const getBlog = async (req, res) => {
    const Blogs = await Blog.find()

    if(Blogs.length === 0) {
        return res.status(404).json("no entries yet");
    } else {
        return res.status(200).json({ Blogs: Blogs });
    }
}


export const getBlogById = async (req, res) => {
    const response = await mongoose.connection.collection("blog").findOne({ _id: new mongoose.Types.ObjectId(req.params.id) });

    if(response) {
        return res.status(200).json({ Blog: response });
    }else {
        return res.status(404).json("no entries yet");
    }
}


export const deleteBlogById = async (req, res) => {
    try {
        if(!req.params.id) {
            return res.status(400).json({ message: "error while deleting!!!" });
        }
        await Blog.findByIdAndDelete(req.params.id)
        return res.status(200).json({ message: "deleted" });
    } catch(error) {
        return res.status(200).json({ message: error.message || 'error' });
    }
}


export const updateBlogById = async (req, res) => {
    console.log(req.params.id);

    try {
        if(!req.params.id) {
            return res.status(400).json({ message: 'error while deleting!' });
        }

        await Blog.findByIdAndUpdate(req.params.id,{$set:req.body});
        return res.status(200).json({ message: "updated" });
    } catch (error) {
        return res.status(400).json({ message: error.message || "updation error" })
    }
}

// -------------------------------------------

export const createBlog2 = async (req, res) => {
    try {
        const { title, description } = req.body;

        if(!title) {
            return res.status(400).json({ message: "blog name is missing" });
        }
        // if(!description) {
        //     return res.status(400).json({ message: "description is missing" });
        // }
       
        const isBlogExist = await Blog.findOne({ title:req.body.title});

        // if(!!isBlogExist) {
        //     return res.status(400).json({ message: "blog name is existing...Please enter another one" });
        // }

        const newBlog = new Blog(req.body)

        const createdBlog = await newBlog.save();
        return res.status(201).json({ data: createdBlog, message: "Successfully inserted blog into db" });
    } catch (error) {
        return res.status(404).json({ message: error.message || 'error' });
    }
}


export const getBlog2 = async (req, res) => {
    const Blogs = await Blog.find()

    if(Blogs.length === 0) {
        return res.status(404).json("no entries yet");
    } else {
        return res.status(200).json({ Blogs: Blogs });
    }
}


export const getBlog2ById = async (req, res) => {
    const response = await mongoose.connection.collection("blog").findOne({ _id: new mongoose.Types.ObjectId(req.params.id) });

    if(response) {
        return res.status(200).json({ Blog: response });
    }else {
        return res.status(404).json("no entries yet");
    }
}


export const deleteBlog2ById = async (req, res) => {
    try {
        if(!req.params.id) {
            return res.status(400).json({ message: "error while deleting!!!" });
        }
        await Blog.findByIdAndDelete(req.params.id)
        return res.status(200).json({ message: "deleted" });
    } catch(error) {
        return res.status(200).json({ message: error.message || 'error' });
    }
}


export const updateBlog2ById = async (req, res) => {
    console.log(req.params.id);

    try {
        if(!req.params.id) {
            return res.status(400).json({ message: 'error while deleting!' });
        }

        await Blog.findByIdAndUpdate(req.params.id,{$set:req.body});
        return res.status(200).json({ message: "updated" });
    } catch (error) {
        return res.status(400).json({ message: error.message || "updation error" })
    }
}