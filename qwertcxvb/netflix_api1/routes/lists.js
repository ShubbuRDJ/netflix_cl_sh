const router = require("express").Router();
const verify = require("../middleware/verifyToken");
const List = require("../models/List")

// create a list
router.post("/addList",verify,async(req,res)=>{
    if(req.user.isAdmin){
        const newList = new List(req.body)
        try {
            const createdList = await newList.save();
            res.status(201).json(createdList)
        } catch (err) {
            res.status(500).json(err)
        }
    }
    else{
        res.status(403).json("you are not an Admin! Not Allowed.");
    }
})
// delete a list
router.delete("/deleteList/:id",verify,async(req,res)=>{
    if(req.user.isAdmin){
        try {
            await List.findByIdAndDelete(req.params.id);
            res.status(200).json("List has been deleted successfully!")
        } catch (err) {
            res.status(500).json(err)
        }
    }
    else{
        res.status(403).json("you are not an Admin! Not Allowed.");
    }
})

// fetch list
router.get("/fetchList",verify,async(req,res)=>{
    const typeQuery = req.query.type;
    const genreQuery = req.query.genre;
    let list = [];
    try {
        if(typeQuery){
            if(genreQuery){
                list = await List.aggregate([{$match:{type:typeQuery,genre:genreQuery}},{$sample:{size:10}}])
            }
            else{
                list = await List.aggregate([{$match:{type:typeQuery}},{$sample:{size:10}}])
            }
        }
        else{
            list = await List.aggregate([{$sample:{size:10}}]) 
        }
        res.status(200).json(list)
    } catch (err) {
        res.status(500).json(err)
    }
})

module.exports=router