const { users } = require("../model")


function checkRole(...role){

    return  checkRole=async(req,res,next)=>{
        const userId=req.user.id
        const userDetails=await users.findOne({where:{id:userId}})
        if(!userDetails){
           return res.status(404).json({
                message:"User doesn't exist with that id"
            })
        }
        if(role.includes(userDetails.role)){
            next()
        }else{
            res.status(400).json({
                message:"You doesn't have a premission "
            })
        }
    
    }
}
module.exports=checkRole