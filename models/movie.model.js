const {Schema,model} = require("mongoose");
const User = require("./user.model");
const MovieSchema=new Schema({
    title:{type:String, required:true},
    year:{type:Number,required:true},
    genres:{type:[String], required:true},
    poster:{type:String,required:true},
    imdbRating: {type:Number, required:true, min: 1, max:10},
    createdBy:{type:String, required:true}
    // contentRating:{}
})
const Movie=model("movie",MovieSchema)
module.exports=Movie;