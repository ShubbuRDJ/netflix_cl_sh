const express = require("express");
const port =5000;
const mongooseConnect = require('./mongoDB');
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const movieRoute = require("./routes/movies");
const listRoute = require("./routes/lists");
mongooseConnect();

const app = express();

app.use(express.json())


app.use("/api/auth",authRoute);
app.use("/api/users",userRoute);
app.use("/api/movies",movieRoute);
app.use("/api/lists",listRoute);
app.listen(port,()=>{
    console.log("Netflix server running on port "+port);
    
})