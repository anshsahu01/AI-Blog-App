import mongoose, { mongo } from "mongoose";



 const connectDB = async ()=>{
    try {
        mongoose.connection.on('connected',()=>console.log("Database Connected"))
        await mongoose.connect(`${process.env.MONGODB_URL }/AIblog`)
    } catch (error) {
        console.log(error.message);
        throw error; 
    }
}

export default connectDB;