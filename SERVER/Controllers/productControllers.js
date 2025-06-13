import { json } from "express";
import productModel from "../Models/productModel.js";
import cloudinary from "cloudinary"

const addProducts = async (req,res)=>{
    try{
        const {name,price,category,subCategory,description,size,bestSeller} = req.body;
        const image1 = req.files.image1 && req.files.image1[0];
        const image2 = req.files.image2 && req.files.image2[0];
        const image3 = req.files.image3 && req.files.image3[0];
        const image4 = req.files.image4 && req.files.image4[0];
        //we cant store images in the database so we will store it int the cloudinary and then will store the url
        const images = [image1,image2,image3,image4].filter((item)=>item != undefined);

        let imagesUrl = await Promise.all(
            images.map(async (items)=>{
                let result = await cloudinary.uploader.upload(items.path,{resource_type:'image'});
                return result.secure_url
            })
        )
        
        
        const productData ={
            name,
            description,
            category,
            price:Number(price),
            subCategory,
            bestSeller:bestSeller == "true"?true:false,
            sizes:JSON.parse(size),
            image:imagesUrl,
            date:Date.now()
        }
        const product = new productModel(productData);
        await product.save();
        res.status(200).json({message:"Product added successfully"});
    }catch(error){
        console.log(error);
        res.status(500).json({message:error.message});
    }
}

const removeProduct = async (req,res) =>{
    try {
        const {id} = req.body;
        // or const id = req.body.id;
        await productModel.findByIdAndDelete(id);
        res.status(200).json({message:"Product removed successfully"});
    } catch (error) {
        console.log(error);
        res.status(500).json({message:error.message});
        
    }
}

const listProducts = async (req,res) =>{
    try {
        const products = await productModel.find({});
        res.status(200).json({message:"Products listed successfully",products});
    } catch (error) {
        console.log(error);
        res.status(500).json({message:error.message});   
    }
}


const singleProduct = async (req,res) =>{
    try {
        const {productId} = req.body;
        const product = await productModel.findById(productId);
        res.status(200).json({message:"Product found successfully",product});
    } catch (error) {
        console.log(error);
        res.status(500).json({message:error.message});
    }
}

export {addProducts,removeProduct,listProducts,singleProduct};