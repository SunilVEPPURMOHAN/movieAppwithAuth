const User = require("../models/user.model");
const bcrypt=require("bcryptjs");
var saltrounds = 10;
const jwt = require("jsonwebtoken");



module.exports.createUser= async (req,res,next)=>{
    const {name,email,password,admin} = req.body;
    try{
    if(!name|!email|!password|!admin){
        // console.log(res.json())
        return res.status(202).json({msg:"Fill the details correctly"})
        
    }

    const checkEmail = await User.findOne({email});
    // console.log(checkEmail);
    if(checkEmail){
        return res.status(202).json({msg:"Email already exists"})
    }
const hashPassword = bcrypt.hashSync(password, saltrounds);
    const user = await User.create({...req.body, password:hashPassword});
        // const user = await User.create(req.body);

    return res.status(200).json(user)
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

    const checkEmail = await User.findOne({email});
    if(!checkEmail){
        return res.status(202).json({message:"User doesn't exist"});
    }
    if(!bcrypt.compareSync(password,checkEmail.password)){
        return res.status(202).json({message:"Invalid credentials"})
    }
const token = jwt.sign(
          {
            userId: checkEmail._id,
            userEmail: checkEmail.email,
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

module.exports.findUser=(req,res,next)=>{
    const {id} = req.params
    User.findOne({_id:id})
        .then((r)=>{
            return res.json(r);
        })
}


module.exports.freeEndpoint = async (req,res,next)=>{
    res.json({ message: "You are free to access me anytime" });
}

module.exports.authEndpoint = async (req,res,next)=>{
    res.json({ message: "You are authorized to access me" });
}

module.exports.makeAdmin = async(req,res,next) =>{
    const {_id} = req.body;
    const updateUser = await User.updateOne({_id: _id},{$set:{admin:"admin"}});
    res.status(200).json({msg:"Updated"})
}

