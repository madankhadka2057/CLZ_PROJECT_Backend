const { users } = require("../../model")
const bcrypt = require('bcryptjs')
const jwt = require("jsonwebtoken")



//Register User!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
exports.registerUser = async (req, res) => {

    const hashedPass = bcrypt.hashSync(req.body.password, 10)//hash the password entered from user

    const userDetails = {
        userName: req.body.userName,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        password: hashedPass
    }
    if (!userDetails.userName || !userDetails.email || !userDetails.phoneNumber || !userDetails.password) {
        return res.status(400).json({
            message: "All filds are required"
        })
    }
    const findUser = await users.findAll({ where: { email: userDetails.email } })
    console.log(findUser)
    if (findUser.length !== 0) {
        return res.status(404).json({
            message: "Email is already exist please Try another one",
            data: findUser
        })

    }
    await users.create(userDetails);
    res.status(200).json({
        message: "User register successfully"
    })
}


//login user!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
exports.loginUser = async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        return res.status(400).json({
            message: "Please entered email or password"
        })
    }
    const existEmail = await users.findOne({
        where: {
            email
        }
    })
    if (existEmail) {
        const isMatch = bcrypt.compareSync(password, existEmail.password)
        if (isMatch) {
            const token = jwt.sign({ id: existEmail.id, role: existEmail.role }, process.env.SECRET_KEY, {
                expiresIn: "10d"
            })
            res.status(200).json({
                message: "Login successfully ",
                data: existEmail,
                token: token
            })

        } else {
            res.status(400).json({
                message: "Invalid password"
            })
        }

    } else {
        res.status(400).json({
            message: "User doesn't exist with this email"
        })
    }
}
//login admin !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
exports.loginAdmin = async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        return res.status(400).json({
            message: "Please entered email or password"
        })
    }
    const existEmail = await users.findOne({
        where: {
            email
        }
    })
    if (existEmail) {
        const isMatch = bcrypt.compareSync(password, existEmail.password)

        if (isMatch) {

            if (existEmail.role !== "admin") {
                return res.status(400).json({
                    message: "Unauthorized access"
                })
            }
            const token = jwt.sign({ id: existEmail.id, role: existEmail.role }, process.env.SECRET_KEY, {
                expiresIn: "10d"
            })

            res.status(200).json({
                message: "Login successfully ",
                data: existEmail,
                token: token
            })

        } else {
            res.status(400).json({
                message: "Invalid password"
            })
        }

    } else {
        res.status(400).json({
            message: "Admin doesn't exist with this email"
        })
    }
}
//get current login user!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
exports.getAuth = async (req, res) => {
    const id = req.user.id
    const user = await users.findByPk(id)
    res.status(200).json({
        message: "User fetch successfully",
        data: user
    })
}
//update current login user profile!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
exports.UpdateProfile = async (req, res) => {
    const id = req.user.id
    const { userName, email, phoneNumber } = req.body
    await users.update({
        userName,
        email,
        phoneNumber
    }, {
        where: {
            id
        }
    })
    const updatedUser = await users.findByPk(id);
    res.status(200).json({
        message: "User updated successfully",
        data: updatedUser
    })
}
//change password!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
exports.changePassword = async (req, res) => {
    const id = req.user.id

    const { currentPassword, newPassword, confirmPassword } = req.body
    if (!currentPassword || !newPassword || !confirmPassword) {
       return res.status(400).json({
            message:"All fields are required"
        })
    }
    console.log(req.body)
    const currentUser = await users.findByPk(id)
    const IsCurrentPass = bcrypt.compareSync(currentPassword, currentUser.password)
    const IsNewPassAsOldPass=bcrypt.compareSync(newPassword, currentUser.password)

    if(!IsCurrentPass){
        return res.status(400).json({
            message:"Current Password doesn't matched"
        })
    }
    if(IsNewPassAsOldPass){
        return res.status(400).json({
            message:"You can't set old password as new Password"
        })
    }
    if(currentPassword==newPassword){
        return res.status(400).json({
            message:"New passowrd and current password can't be same"
        })
    }
    if(newPassword!=confirmPassword){
        return res.status(400).json({
            message:"Confirm password doesn't match"
        })
    }
    currentUser.password=bcrypt.hashSync(newPassword,10)
    currentUser.save()
    res.status(200).json({
        message:"Password change successfully"
    })
}
