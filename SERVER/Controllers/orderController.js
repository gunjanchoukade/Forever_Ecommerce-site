import orderModel from "../Models/orderModel.js";
import userModel from "../Models/userModel.js";
import Stripe from "stripe"

const stripe = new Stripe("sk_test_51RZDtu02oM3E7zOzctdmpt1nU7iNMfZUNFaAanUmkipK8voIAWX1Sxe3Wve9ED4GddD9hU9JpzvOUGDgjfsY5Bc2009ELwfIGk")
const deliveryCharge = 10
const placeOrder = async (req,res)=>{
    try {
        const {userId,items,amount,address} = req.body;
        const orderData = {
            userId,
            items,
            amount,
            address,
            paymentMethod:"COD",
            payment:false,
            date:Date.now()
        }

        const newOrder = new orderModel(orderData)
        await newOrder.save()

        // now the order is placed so empty the cart of user
        await userModel.findByIdAndUpdate(userId,{cartData:{}})
        res.status(200).json({message:"Order placed Succesfully"})
        
    } catch (error) {
        console.log(error);
        res.status(500).json({error})
    }
    
}

const placeOrderStripe = async (req,res)=>{
    try {
        const {userId,items,amount,address} = req.body;
        const {origin} = req.headers;

        const orderData = {
            userId,
            items,
            amount,
            address,
            paymentMethod:"Stripe",
            payment:false,
            date:Date.now()
        }

        const newOrder = new orderModel(orderData)
        await newOrder.save()

        const line_items = items.map((item)=>({
            price_data:{
                currency:"inr",
                product_data:{
                    name:item.name
                },
                unit_amount:item.price * 100
            },
            quantity: item.quantity
        }))

        line_items.push({
            price_data:{
                currency:"inr",
                product_data:{
                    name:'Delivery charges'
                },
                unit_amount:deliveryCharge * 100
            },
            quantity: 1
        })

        const session = await stripe.checkout.sessions.create({
            success_url:`${origin}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url:`${origin}/verify?success=false&orderId=${newOrder._id}`,
            line_items,
            mode:'payment',
        })

        res.json({success:true,session_url:session.url})
    } catch (error) {
        console.log(error)
        res.status(500).json({error})
    }
}

const placeOrderRazorpay= async (req,res)=>{
    
}

const ordersAdmin = async (req,res)=>{
    try{
        const orders = await orderModel.find({})
        res.status(200).json({orders});
    }catch(error){
        res.status(500).json({error})
        console.log(error)
    }
}

const ordersUsers = async (req,res)=>{
    //to display the order on orders page
    const {userId} = req.body;
    try {
        const orders = await orderModel.find({userId});
        res.status(200).json({orders})

    } catch (error) {
       console.log(error);
       res.status(500).json(error.message) 
    }
}

const updateStatus = async (req,res)=>{
    try {
        const {id,status} = req.body;
        await orderModel.findByIdAndUpdate(id,{status})
        res.status(200).json({message:"status updated successfully"})
    } catch (error) {
        console.log(error);
        res.status(500).json({error})
    }
}

const verifyStripe = async(req,res)=>{
    const  {userId,success,orderId} = req.body;
    try{
        if(success === 'true'){
            await orderModel.findByIdAndUpdate(orderId,{payment:true});
            await userModel.findByIdAndUpdate(userId,{cartData:{}})
            res.json({success:true})
        }else{
            await orderModel.findByIdAndDelete(orderId);
            res.json({success:false})
        }
    }catch(error){
        console.log(error);
        res.status(500).json({error})
    }
}


export {placeOrder,placeOrderStripe,placeOrderRazorpay,ordersAdmin,ordersUsers,updateStatus,verifyStripe}