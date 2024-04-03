import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const verifyUserToken = (req,res,next) =>{
 
    const headerWithToken = req.headers.authorization

    if(!headerWithToken){
        res.status(400).json("token is not provided")
    }

    const token = headerWithToken.split(" ")[1]

    if(!token){
        res.status(400).json("token is not provided")
    }

 
    var decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
   
    
    if(decoded.isUser){
        next()
    }
    else{
        res.status(400).json('user not authenticated!');
    }

}