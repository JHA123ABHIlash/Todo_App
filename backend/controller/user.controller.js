const User=require("../model/user.model");
const bcrypt = require("bcryptjs");
const z =require("zod");
const generateTokenAndSaveInCookies = require("../jwt/token")
const userSchema=z.object({
    email:z.string().email({message:"Invailid email Address"}),
    username:z.string().min(3,{message:"Username at least 3 characters long"}),
    password:z.string().min(6,{message:"password at least 6 char long"})
});
const register=async (req,res)=>{
try{
    const {email,username,password}=req.body;
    if(!email || !username || !password){
        return res.status(400).json({errors:"All fields are required"});
    }

    const validation =userSchema.safeParse({email,username,password});

    if(!validation.success){
        const errorMessage=validation.error.issues.map((err)=>err.message);
        return res.status(400).json({errors:errorMessage});
    }
    const user=await User.findOne({email})
        if(user){
            return res.status(401).json({errors:"User already Exists"});
        }
        const hashPassword= await bcrypt.hash(password,10);
    const newuser=new User({ email,username,password:hashPassword });
        

    await newuser.save()
    if(newuser){

        // JWT TOKEN USESE

        const token=await generateTokenAndSaveInCookies(newuser._id,res);
        res.status(201).json({message:"New User Registered successfully",newuser,token})

    }
    
}catch(err){
    console.log(err);
    res.status(500).json({message:"Error occuring in SignUp"});
    
}

}

const login= async (req,res)=>{
    const {email,password}=req.body;

    try{
        if(!email || !password){
            res.status(401).json({message:"All fields are required"});
        }
        const user=await User.findOne({email}).select("password");
        if(!user || !(await bcrypt.compare(password,user.password))){
            return res.status(400).json({errors:"Invailid email or password"});
        }

                const token=await generateTokenAndSaveInCookies(user._id,res);

        return res.status(200).json({message:"User logedin Successfully",user ,token});

    }catch(err){
        console.log(err);
        res.status(500).json({message:"Error occuring in Login "})
        
    }
}

const logout=(req,res)=>{
    try{
        res.clearCookie("jwt",{
            path:'/'
        });
        res.status(200).json({message:"User Logged Out Successfully"});
    }
    catch(err){
        console.log(err);
        res.status(500).json({message:"Error Loggedout User"});
        
    }
    
}

module.exports={register,login,logout};