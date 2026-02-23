const express=require('express');
const {register,login,logout}=require("../controller/user.controller");

const router= express.Router();


router.post("/signup",register);
router.post("/login",login);
router.get("/logout",logout);


module.exports= router;