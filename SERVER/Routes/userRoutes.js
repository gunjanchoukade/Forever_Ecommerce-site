import express from "express"
const userRouter = express.Router()
import { userLogin,userRegister,adminLogin } from "../Controllers/userController.js"


userRouter.post('/login',userLogin)
userRouter.post('/register',userRegister)
userRouter.post('/admin-login',adminLogin)

export default userRouter;