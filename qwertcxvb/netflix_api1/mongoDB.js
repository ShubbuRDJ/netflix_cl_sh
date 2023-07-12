const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const mongooseConnect = ()=>{
    mongoose.connect(process.env.MONGO_URI).then(()=>{
        console.log("netflix database connected successfully");
    }).catch((err)=>console.log("Netflix database not connected")
    );
}

module.exports = mongooseConnect;