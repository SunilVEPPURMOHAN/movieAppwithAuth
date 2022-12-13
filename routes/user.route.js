const express=require("express");
const auth = require("../controllers/auth");
const authadmin = require("../controllers/authadmin");
const { createUser, loginUser, findAllUsers, findUser, freeEndpoint, authEndpoint, deleteUser, makeAdmin, isAdmin } = require("../controllers/user.controller");
// const { createUser, loginUser, findAllUsers, findUser } = require("../controllers/user.controller");

const router = express.Router();
router.post("/signup",createUser)
router.post("/login",loginUser)
router.delete("/:id", auth, deleteUser)
router.put("/makeadmin", auth, makeAdmin);
router.get("/isadmin",auth,isAdmin);

// test end points
router.get("/free-endpoint", freeEndpoint);
router.get("/auth-endpoint", auth, authEndpoint);

router.get("/",findAllUsers)
// router.get("/:id",findUser)






module.exports=router;