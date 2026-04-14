const express=require("express");
const dotenv=require("dotenv");
const cors = require("cors");
const mongoose=require("mongoose");
const todoRoute=require("../backend/route/todo.route");
const userRoute=require("../backend/route/user.route");
const cookieParser = require('cookie-parser');
const app=express();
dotenv.config();


//Dot Env Connection.

const Port=process.env.port ||4002;
const DB_URI=process.env.mongo_url;

//Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
    methods: ["GET","POST","PUT","DELETE"],
    allowedHeaders: ["Content-Type","Authorization"]
}));

// DataBase Connection

mongoose.connect(DB_URI).then(()=>{
    console.log("Connected To MongoDB");
}).catch((err)=>{
    console.log(err);
});

//Routes
app.use("/todo",todoRoute);
app.use("/user",userRoute);
app.listen(Port,(req,res)=>{
    console.log(`app is listening on port ${Port}`);
})