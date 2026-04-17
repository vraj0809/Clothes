import dotenv from "dotenv";
dotenv.config()
import connectDB from "./config/db.js";
import app from "./app.js";
const port = process.env.PORT || 5000;
connectDB();
(app.listen(port,()=>{
    console.log(`hello server ${port}`)
}))

