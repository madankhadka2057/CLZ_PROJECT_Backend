const { users } = require("../../model")
const bcrypt=require('bcryptjs')
const jwt=require("jsonwebtoken")


//Register User!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
exports.registerUser = async (req, res) => {
    
    const hashedPass=bcrypt.hashSync(req.body.password,10)//hash the password entered from user

    const userDetails={
        userName:req.body.userName,
        email:req.body.email,
        phoneNumber:req.body.phoneNumber,
        password:hashedPass
    }

    if (!userDetails.userName || !userDetails.email || !userDetails.phoneNumber || !userDetails.password) {
        return res.status(400).json({
            message: "All filds are required"
        })
    }
    const findUser = await users.findAll({ where:{email: userDetails.email }})
    console.log(findUser)
    if (findUser.length !== 0) {
        return res.status(404).json({
            message: "Email is already exist please Try another one",
            data:findUser
        })

    }
    await users.create(userDetails); 
    res.status(200).json({
        message:"User register successfully"
    })
}


//login user!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
exports.loginUser=async(req,res)=>{
    const {email,password}=req.body
    if(!email||!password){
        return res.status(400).json({
            message:"Please entered email or password"
        })
    }
   const existEmail= await users.findOne({
    where:{
        email
    }
   })
    if(existEmail){
        const isMatch=bcrypt.compareSync(password,existEmail.password)
        if(isMatch){
            const token=jwt.sign({id:existEmail.id},process.env.SECRET_KEY,{
                expiresIn:"20d"
            })
            res.status(200).json({
                message:"Login successfully ",
                data:existEmail,
                token:token
            })
           
        }else{
            res.status(400).json({
                message:"Invalid password"
            })
        }
        
    }else{
        res.status(400).json({
            message:"User doesn't exist with this email"
        })
    }
}