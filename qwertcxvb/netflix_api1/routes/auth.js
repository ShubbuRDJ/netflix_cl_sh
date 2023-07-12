const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
var jwt = require('jsonwebtoken');

// register 
router.post("/register",async(req,res)=>{
    const newUser = new User({
        userName:req.body.userName,
        email:req.body.email,
        password:CryptoJS.AES.encrypt(req.body.password,process.env.ENCRYPTION_SECRET_KEY).toString()
    });
    try {
        const user = await newUser.save();
        res.status(201).json(user);
    } catch (err) {
        res.status(500).json(err);
    }
})

// login user 
router.post("/login",async(req,res)=>{
    try {
        const user = await User.findOne({email:req.body.email});
        !user && res.status(401).json("Wrong password or username");


        var bytes  = CryptoJS.AES.decrypt(user.password, process.env.ENCRYPTION_SECRET_KEY);
        bytes.toString(CryptoJS.enc.Utf8) !== req.body.password && res.status(401).json("Wrong password or username")
        
        const accessToken = jwt.sign({id:user._id,isAdmin:user.isAdmin},process.env.ENCRYPTION_SECRET_KEY,{expiresIn:"5d"})
        const {password,...info}=user._doc;
        res.status(200).json({info,accessToken});
    } catch (err) {
        res.status(500).json(err);
    }
})

module.exports=router;