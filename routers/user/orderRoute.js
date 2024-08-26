const { crateOrder, verifyTransaction, getOrders, getOrdersDetails, cancleOrder, getAllOrder, changeOrderStatus, deleteOrder } = require('../../controller/user/OrderController');
const checkRole = require('../../middleware/checkRole');
const isAuthenticated = require('../../middleware/isAuthenticated');
const catchAsync = require('../../services/catchAsync');

const router=require('express').Router();
router.route('/').post(isAuthenticated,catchAsync(crateOrder))
router.route("/verify").post(isAuthenticated,catchAsync(verifyTransaction))
router.route("/myorder").get(isAuthenticated,catchAsync(getOrders))
router.route("/orderdetails/:orderId").get(isAuthenticated,catchAsync(getOrdersDetails))
router.route("/cancle/:orderId").post(isAuthenticated,catchAsync(cancleOrder))

router.route("/allorders").get(isAuthenticated,checkRole('admin'),catchAsync(getAllOrder))
router.route("/changeOrderStatus/:orderId").post(isAuthenticated,checkRole('admin'),catchAsync(changeOrderStatus))
router.route("/deleteorder/:orderId").delete(isAuthenticated,checkRole('admin'),catchAsync(deleteOrder))
module.exports =router