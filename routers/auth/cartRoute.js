
const isAuthenticated = require('../../middleware/isAuthenticated')
const catchAsync = require('../../services/catchAsync')
const {addToCart,fetchCart, updateQuantity, DeleteCartItem} =require('../../controller/auth/cartController')
const router=require('express').Router()

router.route('/addtocart').post(isAuthenticated,catchAsync(addToCart))
router.route('/fetchcart').get(isAuthenticated,catchAsync(fetchCart))
router.route('/updateqty').post(isAuthenticated,catchAsync(updateQuantity))
router.route('/deleteitem').delete(isAuthenticated,catchAsync(DeleteCartItem))
module.exports=router