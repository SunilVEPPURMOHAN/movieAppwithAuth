const {Schema,model} = require("mongoose")
const UserSchema=new Schema({
    name:{type:String, required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String, required:true},
    admin:{type:String,required:true, enum:["admin","normal"]}
})
const User=model("user",UserSchema)
module.exports=User;