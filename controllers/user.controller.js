const User = require("../models/user.model");
const bcrypt=require("bcryptjs");
var saltrounds = 10;
const jwt = require("jsonwebtoken");
const { default: mongoose } = require("mongoose");



module.exports.createUser= async (req,res,next)=>{
    const {name,email,password,admin} = req.body;
    try{
    if(!name|!email|!password|!admin){
        // console.log(res.json())
        return res.status(202).json({msg:"Fill the details correctly"})
    }

    const checkEmail = await User.findOne({email:email});
    // console.log(checkEmail);
    if(checkEmail){
        return res.status(202).json({msg:"Email already exists"})
    }
const hashPassword = bcrypt.hashSync(password, saltrounds);
    const user = await User.create({...req.body, password:hashPassword});
        // const user = await User.create(req.body);

    return res.status(200).json({msg: "New user created"})
    }
    catch (e) {
    next(e);
}
};

module.exports.loginUser = async(req,res,next)=>{
    const {email,password} = req.body;
    if(!email|!password){
        return res.json("Fill correct details")
    }

    const hashPassword = bcrypt.hashSync(password, saltrounds);

    const checkEmail = await User.findOne({email:email});
    if(!checkEmail){
        return res.status(300).json({message:"User doesn't exist"});
    }
    if(!bcrypt.compareSync(password,checkEmail.password)){
        return res.status(300).json({message:"Invalid credentials"})
    }
const token = jwt.sign(
          {
            userId: checkEmail._id,
            userEmail: checkEmail.email,
            userAdmin: checkEmail.admin
          },
          "RANDOM-TOKEN",
          { expiresIn: "24h" }
        );

    return res.status(200).json({message:"Logged in Successfully",email: email,
            token})
        
};

module.exports.findAllUsers = (req, res, next) => {
    User.find()
        .then((r)=>{
            return res.json(r);
        })
        .catch((e)=>next(e));
};

module.exports.deleteUser=(req,res,next)=>{
    const {userId, userEmail} = req.user;
    const {id} = req.params;
    
        User.findByIdAndDelete(id)
        .then((r)=>{
            return res.status(200).json(r);
        })
        .catch((e)=>{
            return res.status(202).json(e);
        })
    
}


module.exports.freeEndpoint = async (req,res,next)=>{
    res.json({ message: "You are free to access me anytime" });
}

module.exports.authEndpoint = async (req,res,next)=>{
    res.json({ message: "You are authorized to access me" });
}

module.exports.makeAdmin = async(req,res,next) =>{
    const {userId, userEmail} = req.user;
    const {id} = req.body;
    // let id = "63987f7384c0caedfbec73a8";

    User.updateOne({_id:id},{$set:{admin:"admin"}})
    .then((r)=>res.status(200).json({req}))
    .catch((e)=>res.status(401).json(e))


// User.findById(id,(err,docs)=>{
//     if(err){return res.status(300).json(err)};
//     return res.status(200).json(docs);
}

module.exports.isAdmin = async(req,res,next)=>{
const {userId, userEmail} = req.user;
User.findOne({_id:userId,admin:"admin"})
.then(docs=>res.status(200).json(docs))
.catch(e=>res.status(300).json(false))
}

