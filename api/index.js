import express  from "express";
import mongoose from "mongoose";
import authRoutes from './routes/authRoutes.js'
import hotelsRoutes from './routes/hotelsRoutes.js'
import roomsRoutes from './routes/roomsRoutes.js'
import userRoutes from './routes/userRoutes.js'
import dotenv from 'dotenv';
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();
dotenv.config()

// Middlewares
app.use(cors()) 
app.use(cookieParser()) // Cookie parser middleware 
app.use(express.json())
app.use('/api/auth',authRoutes)
app.use('/api/hotels',hotelsRoutes)
app.use('/api/rooms',roomsRoutes)
app.use('/api/user',userRoutes)

app.get('/',(req,res)=>{
    res.send("Hello Guys")
})

// Middleware to handle Errors  
app.use((err,req,res,next)=>{
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something Went Wrong"
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack
    })
})


mongoose.connect(process.env.MongoDBURL)
.then(()=>{
    console.log("Database Connected")
    app.listen(process.env.PORT,()=>{
        console.log("Server running on Port")
    })
})
.catch((error)=>{
    console.log(error)
})