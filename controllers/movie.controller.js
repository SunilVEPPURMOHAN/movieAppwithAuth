const Movie = require("../models/movie.model");

module.exports.createMovie = async(req,res,next)=>{
    const {title,year,poster,genres,imdbRating} = req.body;
}