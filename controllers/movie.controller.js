const Movie = require("../models/movie.model");

module.exports.createMovies = async(req,res,next)=>{
    const moviedb = req.body;
    Movie.create(moviedb,{ordered:false},(err,docs)=>{
        if(err){
            // const errorDocuments = moviedb.filter((doc, index) => {
            // return err.some((error) => error.index === index);
            
        // });
        // res.status(400).json({errorDocuments});
        console.log(err)
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
        if (err) return handleError(err);
        // deleted at most one tank document
      });
}