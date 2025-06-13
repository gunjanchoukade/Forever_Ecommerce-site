import express from "express"
import adminAuth from "../Middlewares/adminAuth.js"
import authUser from "../Middlewares/cartAuth.js"
import { placeOrder,placeOrderRazorpay,placeOrderStripe,ordersAdmin,ordersUsers,updateStatus, verifyStripe } from "../Controllers/orderController.js"
const orderRouter = express.Router()

//admin auth
orderRouter.post('/list',adminAuth,ordersAdmin)
orderRouter.post('/status',adminAuth,updateStatus)

//payment routes
orderRouter.post('/place',authUser,placeOrder)
orderRouter.post('/stripe',authUser,placeOrderStripe)
orderRouter.post('/razor',authUser,placeOrderRazorpay)

orderRouter.post('/user-orders',authUser,ordersUsers)
orderRouter.post('/verify-stripe',authUser,verifyStripe)

export default orderRouter
