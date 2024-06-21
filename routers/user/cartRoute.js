
const isAuthenticated = require('../../middleware/isAuthenticated')
const catchAsync = require('../../services/catchAsync')
const addToCart =require('../../controller/user/cartController')
const router=require('express').Router()

router.route('/addtocart').post(isAuthenticated,catchAsync(addToCart))

module.exports=router