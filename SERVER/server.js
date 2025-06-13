import express from 'express'
import cors from "cors"
import connectionToDB from './Config/ConnectToDb.js';
import Connectcloudinary from './Config/cloudinary.js';
import userRouter from './Routes/userRoutes.js';
import dotenv from 'dotenv'
import productRouter from './Routes/productRoutes.js';
import cartRouter from "./Routes/cartRoutes.js"
import orderRouter from './Routes/orderRoutes.js';
dotenv.config()


const app = express();

//middlewares
app.use(express.json())
app.use(cors())

app.use("/user",userRouter);
app.use('/products',productRouter)
app.use('/cart',cartRouter)
app.use('/order',orderRouter)
app.listen(process.env.port,()=>{
    console.log("Server is running on port",process.env.port);
    connectionToDB();
    Connectcloudinary()
})
