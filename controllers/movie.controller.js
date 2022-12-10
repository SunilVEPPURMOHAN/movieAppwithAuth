const Movie = require("../models/movie.model");

module.exports.createMovies = async(req,res,next)=>{
    const moviedb = req.body;
    // console.log(moviedb);
    Movie.create(moviedb,(err,docs)=>{
        if(err){
      
        res.status(400).json({message:'Check your input'});

    }else{
        res.status(200).json({ message: 'Documents added successfully' });
    }
    });
}
 

module.exports.findMovies = async(req,res,next) =>{
    const {genre,createdBy} = req.body;
    try{
        const data = await Movie.find({genre:genre, createdBy: createdBy});
        return res.status(200).json(data);
}
    catch(e){
        next(e);
    }}

module.exports.deleteMovies = async(req,res,next)=>{
    const {title, year} = req.body;
    Tank.deleteOne({ title: title, year: year }, function (err) {
        if (err) res.status(400).json(err);
        // deleted at most one tank document
      });
}