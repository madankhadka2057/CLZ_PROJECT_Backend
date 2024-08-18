const { crateOrder, verifyTransaction, getOrders, getOrdersDetails, cancleOrder } = require('../../controller/user/OrderController');
const isAuthenticated = require('../../middleware/isAuthenticated');
const catchAsync = require('../../services/catchAsync');

const router=require('express').Router();
router.route('/').post(isAuthenticated,catchAsync(crateOrder))
router.route("/verify").post(isAuthenticated,catchAsync(verifyTransaction))
router.route("/myorder").get(isAuthenticated,catchAsync(getOrders))
router.route("/orderdetails/:orderId").get(isAuthenticated,catchAsync(getOrdersDetails))
router.route("/cancle/:orderId").post(isAuthenticated,catchAsync(cancleOrder))
module.exports =router