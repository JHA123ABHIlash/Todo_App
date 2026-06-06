const jwt =require("jsonwebtoken");
const User=require("../model/user.model");


const generateTokenAndSaveInCookies=async (userId,res)=>{
   const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
        expiresIn: "10d"
    });
    const isProduction = process.env.NODE_ENV === "production";

    res.cookie("jwt",token,{
        httpOnly:true,
        secure:isProduction,
        sameSite:isProduction ? "none" : "lax",
        path:'/'
    })

    await User.findByIdAndUpdate(userId,{token});
    return token;
}

module.exports =generateTokenAndSaveInCookies;