const express=require("express");
const { findMovies } = require("../controllers/movie.controller");

const router = express.Router();

router.get("/home", findMovies);

module.exports = router