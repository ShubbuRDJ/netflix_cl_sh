const router = require("express").Router();
const verify = require("../middleware/verifyToken");
const Movie = require("../models/Movie")

// create a movie
router.post("/addMovie",verify,async(req,res)=>{
    if(req.user.isAdmin){
        const newMovie = new Movie(req.body)
        try {
            const createdMovie = await newMovie.save();
            res.status(201).json(createdMovie)
        } catch (err) {
            res.status(500).json(err)
        }
    }
    else{
        res.status(403).json("you are not an Admin! Not Allowed.");
    }
})

// update a movie
router.put("/updateMovie/:id",verify,async(req,res)=>{
    if(req.user.isAdmin){
        try {
            const updatedMovie = await Movie.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true});
            res.status(200).json(updatedMovie)
        } catch (err) {
            res.status(500).json(err)
        }
    }
    else{
        res.status(403).json("you are not an Admin! Not Allowed.");
    }
})

// delete a movie
router.delete("/deleteMovie/:id",verify,async(req,res)=>{
    if(req.user.isAdmin){
        try {
            await Movie.findByIdAndDelete(req.params.id);
            res.status(200).json("Movie has been deleted.....")
        } catch (err) {
            res.status(500).json(err)
        }
    }
    else{
        res.status(403).json("you are not an Admin! Not Allowed.");
    }
})

// fetch a movie
router.get("/fetchMovie/:id",verify,async(req,res)=>{
        try {
            const movie = await Movie.findById(req.params.id);
            res.status(200).json(movie)
        } catch (err) {
            res.status(500).json(err)
        }
})

// fetch random movie
router.get("/fetchRandomMovie",verify,async(req,res)=>{
    const type = req.query.type;
    let movie;
    try {
        if(type==="series"){
            movie = await Movie.aggregate([
                {
                    $match:{isSeries:true}
                },
                {
                    $sample:{size:1}
                }
            ])
        }
        else{
            movie = await Movie.aggregate([
                {
                    $match:{isSeries:false}
                },
                {
                    $sample:{size:1}
                }
            ])
        }
        res.status(200).json(movie)
    } catch (err) {
        res.status(500).json(err)
    }
})

// get all movie
router.get("/allMovie",verify,async(req,res)=>{
    if(req.user.isAdmin){
        try {
            const movies = await Movie.find();
            res.status(200).json(movies.reverse())
        } catch (err) {
            res.status(500).json(err)
        }
    }
    else{
        res.status(403).json("you are not an Admin! Not Allowed.");
    }
})

module.exports=router