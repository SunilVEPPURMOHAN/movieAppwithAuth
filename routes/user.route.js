const express=require("express");
const auth = require("../controllers/auth");
const { createUser, loginUser, findAllUsers, findUser, freeEndpoint, authEndpoint } = require("../controllers/user.controller");
// const { createUser, loginUser, findAllUsers, findUser } = require("../controllers/user.controller");

const router = express.Router();
router.post("/signup",createUser)
router.post("/login",loginUser)

// test end points
router.get("/free-endpoint", freeEndpoint);
router.get("/auth-endpoint", auth, authEndpoint);

router.get("/",findAllUsers)
// router.get("/:id",findUser)






module.exports=router;