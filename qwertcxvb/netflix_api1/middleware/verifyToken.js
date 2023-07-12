var jwt = require('jsonwebtoken');

function verify(req,res,next){
    const authHeader = req.headers.auth_token;
    if(authHeader){
        const token = authHeader.split(" ")[1];

        jwt.verify(token,process.env.ENCRYPTION_SECRET_KEY,(err,user)=>{
            if(err){
                res.status(403).json("Token is not valid");
            }
            else{
                req.user = user;
                next();
            }
        })
    }
    else{
        res.status(401).json("User not authenticated!")
    } 
}

module.exports=verify;