const Movie = require("../models/movie.model");

module.exports.createMovies = async(req,res,next)=>{
    const {userId, userEmail} = req.user;
    const { title, year, genres, imdbRating} = req.body;
    const moviedb = [{title:title,year: year,genres:genres,imdbRating:imdbRating,
    poster: "MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_SY500_CR0,0,337,500_AL_.jpg",
    posterurl: "https://images-na.ssl-images-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_SY500_CR0,0,337,500_AL_.jpg",
    actors:["Unknown"],
    createdBy:userId
}];

    if(genres.length === 0) return res.status(202).json({message:"You didn't add genre details"});
    // console.log(moviedb);
    Movie.create(moviedb,(err,docs)=>{
        if(err){
      
        res.status(202).json({message:'Check your input'});

    }else{
        res.status(200).json({ message: 'Document added successfully' });
    }
    });
}
 

module.exports.findMovies = async(req,res,next) =>{
    
    
       Movie.find((err,docs) => {
if(err) {
return res.status(202).json(err)
// console.log(err)
} else {
return res.status(200).json(docs)
// console.log(docs)
}
       }
       )
  
   }

module.exports.deleteMovies = async(req,res,next)=>{
    const {title, year} = req.body;
    Movie.deleteOne({ title: title, year: year }, function (err) {
        if (err) res.status(400).json(err);
        // deleted at most one tank document
      });
}

module.exports.myMovies = async(req,res,next)=>{
    const {userId, userEmail} = req.user;
    // console.log(req.body);
    Movie.find({createdBy:userId})
        .then((docs)=> res.status(200).json(docs))
        .catch((err)=>res.status(400).json(err))

}