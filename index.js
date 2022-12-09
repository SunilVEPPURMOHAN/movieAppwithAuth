const express=require('express');
const conn=require("./config/db");
require('dotenv').config()
const userRouter=require("./routes/user.route");
const { setupDefault } = require('./startUp/defaultdb');
const app=express();

// Curb Cores Error by adding a header here
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});


app.use(express.json())
app.get("/",(req,res)=>{
    res.send("welcome")
})
app.use("/user",userRouter)



setupDefault();

app.listen(process.env.PORT,async()=>{
    await conn
    console.log(`server started on port ${process.env.PORT}`)
})