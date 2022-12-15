const express=require("express");
const auth = require("../controllers/auth");
const { findMovies, myMovies, createMovies } = require("../controllers/movie.controller");

const router = express.Router();

router.get("/home", auth, findMovies);
router.get("/mymovies", auth, myMovies);

router.post("/createmovies",auth,createMovies);

module.exports = router