import bcrypt from "bcrypt";
import mongoose, { get } from "mongoose";
import { Admin } from "../model/adminModel.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();


export const register = async (req, res) => {


    try {
        const { fname, lname, email, password } = req.body

        if (!lname) {
            return res.status(400).json({ message: "lname is missing" })
        }
        if (!fname) {
            return res.status(400).json({ message: "fname is missing" })
        }
        if (!email) {
            return res.status(400).json({ message: "email is missing" })
        }
        if (!password) {
            return res.status(400).json({ message: "password is missing" })
        }

        const isMailExist = await Admin.findOne({ email: email })


        if (!!isMailExist) {
            return res.status(400).json({ message: "mail is exising , please enter another one" })
        }



        // .............encryption........ //

        //(saltRounds=10)
        //  req.body.password = myPlaintextPassword  //

        bcrypt.hash(req.body.password, 10, async (err, hash) => {
            const newAdmin = new Admin({
                email, fname, lname, password: hash,
            })

            const saveAdmin = await newAdmin.save();

            console.log(saveAdmin);

            if (saveAdmin) {

                const { fname, lname, email, ...others } = saveAdmin._doc;

                let userData = { fname, lname, email }

                return res.status(201).json({ user: userData, message: 'successfully inserted admin into db' });
            } else {
                return res.status(400).json({ user: saveAdmin, message: 'not inserted data into databse' });
            }
        })

    } catch (error) {
        return res.status(404).json({ message: error.message || 'error' });
    }

}


export const login = async (req, res) => {

    const { email, password } = req.body;
    if (!email) {
        return res.status(400).json({ message: "email is missing" })
    }
    if (!password) {
        return res.status(400).json({ message: "password is missing" })
    }



    const getAdmin = await Admin.findOne({ email })

    if (!getAdmin) {
        return res.status(400).json({ message: 'invalid email' })
    }


    // ------

    bcrypt.compare(req.body.password, getAdmin.password).then(function (result) {

        if (result) {


            const token = jwt.sign({ userId: getAdmin._id, isAdmin: getAdmin.isAdmin }, process.env.JWT_SECRET_KEY, { expiresIn: "10h" });

            // userid = userid,
            // isAdmin = true

            // GENERATE JWT TOKEN

            const { fname, lname, email, ...others } = getAdmin._doc;

            let userData = { fname, lname, email }


            return res.status(200).json({ users: userData, message: 'Successfull', token })
        } else {
            return res.status(400).json({ message: "Invalid Email or Password" })

        }
    });

}


export const getAdmin = async (req, res) => {

    try {
        const { id } = req.params;
    console.log('Admin ID:', req.params.id);
        // Check if the provided ID is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid admin ID" });
        }

        const getAdmin = await Admin.findById(id)

        if (!getAdmin) {
            return res.status(400).json({ message: "Admin not found!" })
        }

        return res.status(200).json({ user: getAdmin, message: 'Admin found' })
    } catch (error) {
        return res.status(400).json({ message: error.message || 'Error' })
    }
}

export const updateAdminProfile = async (req, res) => {
    console.log(req.params.id);

    try {
        const userId = req.params.id; // No need to convert to ObjectId since Mongoose will handle it
        const updates = req.body; // Assuming req.body contains the fields to update

        // Check if the admin exists
        const getAdmin = await Admin.findById(userId);
        if (!getAdmin) {
            return res.status(400).json({ message: "Admin not found" });
        }

        // Update the admin document
        const updatedAdmin = await Admin.findByIdAndUpdate(userId, updates, { new: true });

        return res.status(200).json({ message: 'Updated admin', admin: updatedAdmin });
    } catch (error) {
        return res.status(400).json({ message: error.message || 'Error' });
    }
}




export const getAllAdmin = async (req, res) => {

    try {

        const getAllAdmin = await Admin.find()

        if (!getAllAdmin.length > 0) {
            return res.status(400).json({ message: "colletion is not found!" })
        }

        return res.status(200).json({ users: getAllAdmin, message: 'users' })
    } catch (error) {
        return res.status(400).json({ message: error.message || 'error' })

    }

}