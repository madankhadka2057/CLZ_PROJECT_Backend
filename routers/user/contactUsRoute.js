const { contactUs } = require('../../controller/user/contactUs')
const isAuthenticated = require('../../middleware/isAuthenticated')
const catchAsync = require('../../services/catchAsync')

const router=require('express').Router()

router.route('/contact').post(catchAsync(contactUs))

module.exports=router