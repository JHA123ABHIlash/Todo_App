const jwt=require("jsonwebtoken");
const User=require("../model/user.model");

const authenticate=async(req,res,next)=>{
    const token=req.cookies.jwt;

    if(!token){
        return res.status(401).json({message:"Unauthorized"});
    }
    try{
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        req.user=await User.findById(decoded.id);
    }
    catch(err){
        return res.status(401).json({message:""+err.message});
    }
    next();
}

module.exports=authenticate;