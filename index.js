const express=require('express');
const conn=require("./config/db");
require('dotenv').config()
const userRouter=require("./routes/user.route");
const movieRouter = require("./routes/movie.route");
const { setupDefault } = require('./startUp/defaultdb');
// const cors = require('cors');
const app=express();
// app.use(cors());


app.use(express.json())

// Curb Cores Error by adding a header here
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", '*');
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  res.setHeader(
    "Access-Control-Allow-Credentials", true
  );
  next();
});


app.use("/user",userRouter)
app.use("/movie",movieRouter)

app.get("/",(req,res)=>{
    res.send("welcome");
    console.log(req.headers)
})


app.listen(process.env.PORT,async()=>{
    await conn
    console.log(`server started on port ${process.env.PORT}`)
})

setupDefault();
