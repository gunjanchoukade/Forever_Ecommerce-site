import mongoose from "mongoose";

const connectionToDB = async ()=>{
    await mongoose.connect(process.env.DB_URL).then(()=>{
        console.log("Connected to the Database");
    })
    .catch((err)=>{
        console.log(err);
    })
}

export default connectionToDB;