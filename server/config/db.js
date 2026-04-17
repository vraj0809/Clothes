import mongoose from "mongoose";

const connectDB = async() => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("connect db sucessfully")
    } catch (error) {
        console.log("error in connect db")
    }
    
}

export default connectDB;