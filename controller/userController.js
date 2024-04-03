import bcrypt from "bcrypt";
import { User } from "../model/userModel.js";
import Jwt from "jsonwebtoken";

export const signUp = async (req, res) => {

    try {
        const { userFname, userLname, userEmail, userPassword } = req.body

        if (!userFname) {
            return res.status(400).json({ message: "first name is missing" });
        }
        if (!userLname) {
            return res.status(400).json({ message: "Last name is missing" });
        }
        if (!userEmail) {
            return res.status(400).json({ message: "Email is missing" });
        }
        if (!userPassword) {
            return res.status(400).json({ message: "Password is missing" });
        }


        const isMailExist = await User.findOne({ userEmail:userEmail })

        if(!!isMailExist) {
            return res.status(404).json({ message: "Mail is Existing , Please enter another one..." });
        }

        bcrypt.hash(req.body.userPassword, 10, async(err, hash) => {
            const newUser = new User ({
                userFname,userLname,userEmail,userPassword:hash
            })

            const saveUser = await newUser.save();
            console.log(saveUser);

            if(saveUser) {

                return res.status(200).json({ user:saveUser, message: "Successfully inserted data into db" });
            } else {
                return res.status(400).json({ user:saveUser, message: "No Datas are inserted into db" })
            }
        })

    } catch ( error ){
        return res.status(404).json({ message: error.message || 'error' });
    }
}


export const login = async (req, res) => {
    const { userEmail, userPassword } = req.body;
    if (!userEmail || !userPassword) {
        return res.status(400).json({ message: "All Fields are Mandatory" });
    }

    const getUser = await User.findOne({ userEmail });

    if (!getUser) {
        return res.status(400).json({ message: "Invalid Email" });
    }

    bcrypt.compare(req.body.userPassword, getUser.userPassword).then(function (result) {
        if (result) {
            const token = Jwt.sign({ userId: getUser._id,isUser:getUser.isUser},process.env.JWT_SECRET_KEY, {expiresIn:"10h"});
            console.log("token: ", token);
            
            return res.status(200).json({ users:getUser, message: "Successfull", token });
        } else {
            return res.status(400).json({ message: "Invalid Email or Password" });
        }
    })
}


export const getUser = async (req, res) => {

    try {
        const { id } = req.params;

        const getUser = await User.findById(id)

        if (!getUser) {
            return res.status(400).json({ message: "user is not found!" })
        }

        return res.status(200).json({ users: getUser, message: 'invalid email' })
    } catch (error) {
        return res.status(400).json({ message: error.message || 'error' })

    }

}


export const getUsers = async (req, res) => {

    try {

        const getUsers = await User.find()
        console.log(getUsers)

        if (getUsers.length === 0) {
            return res.status(400).json({ message: "user is not found!" })
        }else{

            return res.status(200).json({ users: getUsers })
        }

    } catch (error) {
        return res.status(400).json({ message: error.message || 'error' })

    }

}