//this file is to request authentication from admin for apis like add,remove,delete products
import express from "express"
import jwt from "jsonwebtoken"
const adminAuth = (req,res,next)=>{
    try{
        const {token} = req.headers;
        if(!token){
            return res.status(401).json({message:"Unauthorized access,token not found"});
        }
        const decode_token = jwt.verify(token,process.env.JWT_SEC_KEY);
        if(decode_token != process.env.ADMIN_EMAIL + process.env.ADMIN_PASS){
            return res.status(500).json({message:"Not authorized,wrong token"});
        }
        next();
    }
    catch(error){
        console.log(error);
        res.status(500).json({message:error.message});
    }
}
export default adminAuth
