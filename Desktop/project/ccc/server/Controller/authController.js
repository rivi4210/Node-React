const User =require("../Model/userModel")
const bcrypt= require('bcrypt')
const jwt=require("jsonwebtoken")


const login=async(req,res)=>{
    const {username,password}=req.body
    if(!username || !password) return res.status(401).json({message:"there filds are required"})

    const user=await User.findOne({username:username}).lean()
    if(!user) return res.status(401).json({ message:"Unauthorized"})

    const match=await bcrypt.compare(password,user.password)
    console.log('match',match);
    if(!match) return res.status(401).json({ message:"Unauthorized"})
    
    const userTok={_id:user._id,name:user.name ,email:user.email,username:user.username, phone:user.phone, role:user.role}

    const accessToken = jwt.sign(userTok,process.env.ACCESS_TOKEN_SECRET)
console.log(userTok);
    res.json({token:accessToken,user:userTok.role})    
}

const register=async(req,res)=>{
    const {name,username,password,email}=req.body

    if(!username || !password || !name) return res.status(401).json({ message:"there filds are required"})
    // if(validator.isEmail(email)) return res.status(401).json({message:"the email is invalid"})

    const duplicate = await User.findOne({username:username}).lean()
    if (duplicate) return res.status(409).json({message:"there is a same user"})

    const hashPass=await bcrypt.hash(password, 10)
    const userObj= {name,email,username,password:hashPass}
    console.log(userObj);
    const user = await User.create(userObj)
    if(user) return res.status(200).json({message:"success"})
    else return res.status(401).json({message:"invalid"}) 
}

module.exports={login,register}