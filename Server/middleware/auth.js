import jwt from 'jsonwebtoken'
import { User } from '../models/user.model.js';

 const auth =async (req, res, next) => {
    const token =req.cookies?.accessToken|| req.header('Authorization');
   if(!token){
    return res.status(401).json({
        status :false,
        message : "No token provided"
    })
   }


    try {

       const decodedToken =  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

       // token mil gya to user ko dhundo

       const user =await User.findById(decodedToken?._id).select(
        "-password -refreshToken"
       )  // get user without password and refresh token

       if(!user){
        return res.json({
            status : 401,
            success : false,
            message : "Invalid Access Token"
        })
       }

       req.user = user;
        next();
        
    } catch (error) {
        res.json({
            success : false,
            message : "Invalid Access Token"
        })
        
    }
}

export default auth