import jwt from "jsonwebtoken"
//to check whether user is logged in or not
const authUser = (req,res,next) =>{
    try{
        const {token} = req.headers;

        if(!token){
            res.status(500).json({message:"Not authorized.Login Again!!"});
            return;
        }
        const decoded_token = jwt.verify(token,process.env.JWT_SEC_KEY);
        req.body.userId = decoded_token.id
        next()
    }catch(error){
        console.log(error);
    }
}

export default authUser