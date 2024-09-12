const { registerUser, loginUser, loginAdmin, getAuth, UpdateProfile, changePassword } = require("../../controller/auth/authContorller")
const isAuthenticated = require("../../middleware/isAuthenticated")
const catchAsync = require("../../services/catchAsync")

const router=require("express").Router()
router.route('/register').post(catchAsync(registerUser))
router.route('/login').post(catchAsync(loginUser))
router.route('/adminlogin').post(catchAsync(loginAdmin))
router.route('/getauth').get(isAuthenticated,catchAsync(getAuth))
router.route('/updateprofile').post(isAuthenticated,catchAsync(UpdateProfile))
router.route('/changepass').post(isAuthenticated,catchAsync(changePassword))
module.exports=router