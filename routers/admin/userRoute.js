const { getAllUser, deleteUser, updateUser, changePass } = require('../../controller/admin/userController')
const checkRole = require('../../middleware/checkRole')
const IsAuthenticated=require('../../middleware/isAuthenticated')
const catchAsync = require('../../services/catchAsync')
const router=require('express').Router()

router.route("/getuser").get(IsAuthenticated,checkRole("admin"),catchAsync(getAllUser))
router.route("/delete/:id").delete(IsAuthenticated,checkRole("admin"),catchAsync(deleteUser))
router.route("/update/:id").post(IsAuthenticated,checkRole("admin"),catchAsync(updateUser))
router.route("/changepass/:id").post(IsAuthenticated,checkRole("admin"),catchAsync(changePass))

module.exports=router