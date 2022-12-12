const express=require("express");
const auth = require("../controllers/auth");
const { findMovies, myMovies } = require("../controllers/movie.controller");

const router = express.Router();

router.get("/home", auth, findMovies);
router.get("/mymovies", auth, myMovies);

module.exports = router