import express from "express"
import { addProducts,singleProduct,listProducts,removeProduct } from "../Controllers/productControllers.js";
import upload from "../Middlewares/productMiddleware.js";
import adminAuth from "../Middlewares/adminAuth.js";
const productRouter = express.Router()


productRouter.post('/add',adminAuth,upload.fields([{name:'image1',maxCount:1},{name:'image2',maxCount:1},{name:'image3',maxCount:1},{name:'image4',maxCount:1}]),addProducts);
productRouter.post('/single',singleProduct);
productRouter.post('/remove',adminAuth,removeProduct);
productRouter.get('/list',listProducts)

export default productRouter; 