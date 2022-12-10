const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const { saltrounds } = require("../controllers/user.controller");
const fs = require('fs');
const Movie = require("../models/movie.model");
const moviedb = require("./moviedb.json");
moviedb.forEach((movie)=>{movie.createdBy = "admin"})
 
module.exports.setupDefault = async(req,res,next)=>{
// Creating default admin account
const checkEmail = await User.findOne({email: "admin@email.com"});
if(!checkEmail){
const user = await User.create({name:"admin",email:"admin@email.com",password:bcrypt.hashSync("password",saltrounds),admin:"admin"});
}
//Creating default moviedb

// Insert the objects into the database
Movie.create(moviedb,(err, docs) => {
  if (err) {
    // const errCount = err.length;
    // console.log(`${errCount} couldn't be added`);
    console.log('Document not loaded properly');
  } else {
    console.log('The objects were inserted successfully');
  }
});
}

