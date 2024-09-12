
const { users } = require("../../model")
const bcryptjs=require('bcryptjs')
exports.getAllUser = async (req, res) => {

    const AllUsers = await users.findAll()
    res.status(200).json({
        message: "User fetch success fully",
        user: AllUsers
    })
}
exports.deleteUser = async (req, res) => {
    const { id } = req.params
    const IsUserExist = await users.findByPk(id)
    if (!IsUserExist) {
        res.status(400).json({
            message: "User doesn't exist"
        })
    } else {
        await users.destroy({ where: { id } })
        const Alluser = await users.findAll()
        res.status(200).json({
            message: "User Deleted Successfully",
            user:Alluser
        })
    }

}
exports.updateUser = async (req, res) => {
    const { id } = req.params
    console.log(id)
    const { userName, email, phoneNumber, password } = req.body
    console.log(req.body)
    if (!userName || !email || !phoneNumber) {
       return res.status(400).json({
            message: "Please provide all required field"
        })
    }
    const isEmailExist = await users.findAll({ where: { email } })
    const exceptCurrentuser=isEmailExist.filter((data)=>{
        return data.id!=id
    })
    const hashedPass=bcryptjs.hashSync(password,10)
    if(exceptCurrentuser.length>0){
        res.status(400).json({
            message:"Emali is already exist "
        })
    }else{
        const updatedUser=await users.update({
            userName,
            email,
            phoneNumber,
            password:hashedPass
        },{
            where:{
                id:id
            }
        })
        const Alluser = await users.findAll()
        res.status(200).json({
            message:"User updated successfully",
            user:Alluser
        })
        
    }
}
exports.changePass = async (req, res) => {
    const {id} = req.params

    const { newPassword, confirmPassword } = req.body
    if (!newPassword || !confirmPassword) {
       return res.status(400).json({
            message:"All fields are required"
        })
    }
    if(newPassword!=confirmPassword){
        return res.status(400).json({
            message:"Confirm password doesn't match"
        })
    }
    const currentUser = await users.findByPk(id)
    currentUser.password=bcryptjs.hashSync(newPassword,10)
    currentUser.save()
    res.status(200).json({
        message:"Password change successfully"
    })
}