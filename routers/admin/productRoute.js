const multer = require('multer')
const { addProduct, fetchAllProduct, fetchSingleProduct, deleteProduct, updateProduct } = require('../../controller/admin/productController')
const isAuthenticated = require('../../middleware/isAuthenticated')
const catchAsync = require('../../services/catchAsync')
const { storage } = require('../../middleware/multerConfig')
const checkRole = require('../../middleware/checkRole')

const router=require('express').Router()
const upload=multer({storage:storage})
router.route("/addproduct").post(isAuthenticated,checkRole('admin'),upload.single('img'),catchAsync(addProduct))
router.route('/fetchproduct').get(catchAsync(fetchAllProduct))
router.route('/fetchsingleproduct/:id').get(catchAsync(fetchSingleProduct))
router.route('/delete/:id').delete(catchAsync(deleteProduct))
router.route('/update/:id').patch(isAuthenticated,checkRole('admin'),upload.single('img'),catchAsync(updateProduct))

module.exports=router