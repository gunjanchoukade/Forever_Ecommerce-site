import mongoose from "mongoose";
let Schema = mongoose.Schema

const userSchema = new Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    cartData:{type:Object,default:{}}
},{minimize:false})

//minimize:false tell the schema to keep the empty objects instead of removing them
const userModel = mongoose.model('user',userSchema);
export default userModel;