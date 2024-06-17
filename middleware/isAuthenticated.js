const jwt=require("jsonwebtoken")
const {promisify}=require("util")
const { users } = require("../model")

const isAuthenticated=async(req,res,next)=>{
    const token=req.headers.authorization
    try{
        if(!token){
            return res.status(404).json({
                message:"Please send Token"
            })
        }
        const verifyToken= await promisify(jwt.verify)(token,process.env.SECRET_KEY)
        if(!verifyToken){
            return res.status(404).json({
                message: "Don't try to this",
              });
        }
        const userDetails=await users.findOne({where:{id:verifyToken.id}})
        if(!userDetails){
            res.status(404).json({
                message:"User doesn't exist whith this id"
            })
        }else{
            req.user=userDetails
            next()
        }
    }catch(error){
        res.status(404).json({
            message:error.message
        })
    }

}
module.exports=isAuthenticated