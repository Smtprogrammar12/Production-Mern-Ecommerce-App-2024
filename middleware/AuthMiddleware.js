import Jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";


// Protected Routes Token Base;

export const requireSignIn = async (req, res ,next) => {
    try {
        const decode =  Jwt.verify(req.headers.authorization, process.env.SECRET_KEY);
        req.user = decode;
        next();
        
    } catch (error) {
        console.log(error);
        return res.status(401).send({
            status: false,
            message: "error in requireSignIn middleware!",
        });
    }
}

// Admin middleware

export const isAdmin = async (req, res, next) => {
  
    try {
        console.log(req.user._id);
        const user = await userModel.findById(req.user._id);
    
        if (user.role !== 1) {
            return res.status(403).send({
                status: false,
                message: 'You are not admin!'
            })
            
        } else {
           next(); 
        }
        
    } catch (error) {
         console.log(error);
        return res.status(401).send({
            status: false,
            message: "error in isAdmin middleware!",
        });
        
    }
  
}