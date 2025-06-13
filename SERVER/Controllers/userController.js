import userModel from "../Models/userModel.js"
import validator from 'validator'
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"



//functions 
const generateToken = (id)=>{
    return jwt.sign({id},process.env.JWT_SEC_KEY);
    
}

const userLogin = async (req,res)=>{
    try {
        const {email,password} = req.body;

        const user = await userModel.findOne({email});
        if(!user){
            return res.status(400).json({msg:"Invalid Credentials"});
        }

        const isMatch =await  bcrypt.compare(password,user.password);
        console.log(isMatch);
        if(isMatch){
            const token = generateToken(user._id);
            return res.status(200).json({msg:'Login Successfull',token});
        }else{
            return res.status(400).json({msg:"Invalid Credentials"});
        }
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({message:error.message});
    }
}

const userRegister = async (req,res)=>{
    try {
        const {name,email,password} = req.body;

        const exist = await userModel.findOne({email});
        if(exist){//checks if user already exist
            res.status(400).json({message:'user already exists'})
            return;
        }
 
        if(!validator.isEmail(email)){ //checks if user entered a valid email
            res.status(400).json({message:'please enter a valid email.'})
            return;
        }

        //checks the password length
        if(password.length < 8) {
            res.status(400).json({message:'Password must be atleast 8 characters long.'})
            return;
        }

        //hash the password
        const hashPass = await bcrypt.hash(password,10);
        
        const newUser =  new userModel({
            name,
            email,
            password:hashPass
        })

        const user = await newUser.save();
        const token = generateToken(user._id);
        res.status(200).json({msg:"Regsitration Successfull",token});
        return;



    } catch (error) {
        console.log(error);
        res.status(500).json({msg:error.message});
        return;
    }
}

const adminLogin = async (req,res)=>{
    try{
        const {email,password} = req.body;
        if(email == process.env.ADMIN_EMAIL && password == process.env.ADMIN_PASS){
            const token = jwt.sign(email+password,process.env.JWT_SEC_KEY)
            res.status(200).json({message:"Admin login successfull",token});
            return;
        }else{
            return res.status(500).json({message:"Invalid credentials"});
        }
    }
    catch(error){
        console.log(error);
        res.status(500).json({msg:error.message});
        return;
    }
}

export {userLogin,userRegister,adminLogin}