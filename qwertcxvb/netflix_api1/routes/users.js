const router = require("express").Router();
const verify = require("../middleware/verifyToken");
const User = require("../models/User");
const CryptoJS = require("crypto-js");

// update 
router.put("/updateUser/:id",verify,async(req,res)=>{
    if(req.user.id === req.params.id || req.user.isAdmin){
        if(req.body.password){
            req.body.password = CryptoJS.AES.encrypt(req.body.password,process.env.ENCRYPTION_SECRET_KEY).toString()
        }
        try {
            const updatedUser = await User.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true})
            res.status(200).json(updatedUser);
        } catch (err) {
            res.status(500).json(err)
        }
    }
    else{
        res.status(403).json("you can update only your account!");
    }
})
// delete
router.delete("/deleteUser/:id",verify,async(req,res)=>{
    if(req.user.id === req.params.id || req.user.isAdmin){
        try {
            await User.findByIdAndDelete(req.params.id)
            res.status(200).json("User has deleted!");
        } catch (err) {
            res.status(500).json(err)
        }
    }
    else{
        res.status(403).json("you can delete only your account!");
    }
}) 
// fetch
router.get("/findUser/:id",async(req,res)=>{
        try {
            const user=await User.findById(req.params.id)
            const {password,...info} = user._doc;
            res.status(200).json(info);
        } catch (err) {
            res.status(500).json(err)
        }
})
// fetch all
router.get("/findAllUser",verify,async(req,res)=>{
    const query = req.query.new;
    if(req.user.isAdmin){
        try {
            const user = query?await User.find().sort({_id:-1}).limit(5): await User.find();
            res.status(200).json(user);
        } catch (err) {
            res.status(500).json(err)
        }
    }
    else{
        res.status(403).json("you are not allowed! Admin can...");
    }
}) 
// get user stats
router.get("/stats",verify,async(req,res)=>{
    // const today = new Date();
    // const lastYear = today.setFullYear(today.setFullYear()-1);
    if(req.user.isAdmin){
        try {
            const data = await User.aggregate([
                {
                    $project:{
                        month:{$month:"$createdAt"}
                    }
                },
                {
                    $group:{
                        _id:"$month",
                        total:{$sum:1}
                    }
                }
            ]);
            res.status(200).json(data)
        } catch (err) {
            res.status(500).json(err)
        }
    }
    else{
        res.status(403).json("you are not allowed! Admin can...");
    }
}) 


module.exports=router