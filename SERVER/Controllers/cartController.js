import userModel from "../Models/userModel.js"

const addCart = async (req,res) =>{
    try{
        const {userId,id,size} = req.body
        const userData = await userModel.findById(userId);
        const cartData = userData.cartData;

        if(cartData[id]){
            if(cartData[id][size]){
                cartData[id][size] += 1;
            }else{
                cartData[id][size]=1;
            }
        }else{
            cartData[id]={}
            cartData[id][size]=1;
        }
        await userModel.findByIdAndUpdate(userId,{cartData})
        res.status(200).json({message:"Added to cart successfully"})

    }catch(error){
        console.log(error)
        res.send(error.message);
    }
}

const getCart = async (req,res) =>{
    try {
        const {userId} = req.body;
        const userData = await userModel.findById(userId);
        const cartData = userData.cartData;
        res.status(200).json({cartData})
    } catch (error) {
        console.log(error);
        res.send(error.message)
    }
}
const updateCart =async (req,res) =>{
    try {
        const {userId,id,size,quantity} = req.body;
        const userData =await  userModel.findById(userId);
        const cartData = userData.cartData;
        cartData[id][size] = quantity;
        await userModel.findByIdAndUpdate(userId,{cartData})
        res.status(200).json({message:"Cart updated successfully"})
        
    } catch (error) {
        console.log(error);
        res.send(error.message)
    }
}

export {addCart,getCart,updateCart}