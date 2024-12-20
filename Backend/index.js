import express from "express"
import cookiePraser from "cookie-parser"
import bodyParser from "body-parser"
import mongoose from "mongoose";
import cors from "cors"
import dotenv from "dotenv"
import path, { dirname } from "path"


dotenv.config();

const _dirname=path.resolve()

import auth from './src/routes/auth.js'
import user from "./src/routes/user.js"
import owner from './src/routes/owner.js'
import slot from "./src/routes/slots.js"
import booking from './src/routes/booking.js'
import websiteReview from "./src/routes/webReview.js";
import './src/cron.js'

const app=express();

const port=process.env.PORT ||3001;

// const corsOptions={
//     origin:true,//allows any domain to access servers resources which is helpful during development
// }

const corsOptions = {
    origin: "*",//process.env.CORS_ORIGIN || 'https://yourfrontend.com', // specify your frontend URL here
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'Content-Type, Authorization',
};


// app.get('/',(req,res)=>{
//     res.json({
//         message:"server is running"
//     })
//     console.log("API working")
// })


mongoose.set({"strictQuery":true})
app.get("*",(req,res)=>{
        
    res.sendFile(path.resolve(_dirname,"Frontend","dist","index.html"))
})

app.use(cookiePraser())
app.use(express.json());
app.use(express.static(path.join(_dirname,'/Frontend/dist')))
// app.use(bodyParser.json());
app.use(express.urlencoded({extended: true}));
app.use(cors(corsOptions))
app.use("/api/v1/auth",auth);
app.use("/api/v1/user",user);
app.use("/api/v1/owner",owner);
app.use("/api/v1/slot",slot);
app.use('/api/v1/bookings',booking)
app.use('/api/v1/webReview',websiteReview)







const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("MongoDB connected successfully");
    } catch (err) {
        console.log("MongoDB connection error:", err);
    }
};

app.listen(port,()=>{
    connectDB();
    console.log("server listening",port)
})
