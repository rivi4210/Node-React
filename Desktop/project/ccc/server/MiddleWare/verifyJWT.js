const jwt=require("jsonwebtoken")

const verifyJWT=async(req,res,next)=>{

    const header = req.headers.authorization || req.headers.Authorization
    if(!header || !header.startsWith("Bearer")) return res.status(401).json({message:"from middleWare Unauthorized"})

    const token=header.split(" ")[1]
    jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,decoded)=>{
        if(err) return res.status(401).json({message:"forbidden"})
        req.user=decoded
        next()
    })

}
module.exports=verifyJWT