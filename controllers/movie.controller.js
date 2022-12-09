const Movie = require("../models/movie.model");

module.exports.createMovie = async(req,res,next)=>{
    const {title,year,poster,genres,imdbRating, createdBy} = req.body;
    try{
        if(!title|!year|!poster|!genres|!imdbRating){
            return res.status(202).json({msg:"Please fill in all details"})
        }

        const checkMovie = await Movie.findOne({title:title,year:year});
    if(checkMovie){
        return res.status(202).json({msg:"Movie already exists"})
    }
    const movie = await Movie.create(req.body);

    return res.status(200).json(movie)
    }
    catch (e) {
    next(e);
}
}

// module.exports.editMovie = async(req,res,next) =>{
//     const {title,year,poster,genres,imdbRating, createdBy} = req.body;
//     try{
//         if(!title|!year|!poster|!genres|!imdbRating){
//             return res.status(202).json({msg:"Please fill in all details"})
//         }


// }