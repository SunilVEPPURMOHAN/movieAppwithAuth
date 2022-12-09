const dotenv=require("dotenv")
dotenv.config()
const mongoose=require("mongoose");
const conn=mongoose.connect(process.env.MONGO_URI,{useNewUrlParser: true, useUnifiedTopology: true})
.then(()=>console.log("Connected to database"))
.catch(()=>console.log("Error occured in database"))

// mongoose.use('authDB',false);

module.exports = conn;

