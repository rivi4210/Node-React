const mongoose =require("mongoose")

const UserModel=new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    username:{
        type:String,
        require:true,
        unique:true,
        lowercase:true,
    },
    password:{
        type:String,
        require:true,
    },
    email:{
        type:String,
    },
    role:{
        type:String,
        enum:["admin", "user"],
        default:"user",
    }
})

module.exports=mongoose.model('User',UserModel)