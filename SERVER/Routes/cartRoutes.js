import express from "express"
import { addCart,updateCart,getCart } from "../Controllers/cartController.js"
import authUser from "../Middlewares/cartAuth.js"
const cartRouter = express.Router()

cartRouter.post('/get',authUser,getCart)
cartRouter.post('/add',authUser,addCart)
cartRouter.post('/update',authUser,updateCart)

export default cartRouter