const { where } = require("sequelize");
const { products, carts } = require("../../model");

module.exports = addToCart = async (req, res) => {
    const productId = req.body.id;
    const quantity = req.body.quantity
    const userId = req.user.id
    if (!productId || !userId) {
        return res.status(404).json({
            message: "productId or userId are required"
        })
    }
    const existProduct = await products.findByPk(productId)
    if (!existProduct) {
        return res.status(400).json({
            message: "Product doesn't exist with that id"
        })
    }
    const cartItems = await carts.findOne({
        where: {
            productId,
            userId
        }
    })
    if (!cartItems) {
        var data = await carts.create({
            quantity,
            userId,
            productId
        })
    } else {
        
        console.log("madan !!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
        cartItems.quantity += quantity
        data=await cartItems.save()
        // const product = await products.findByPk(productId)
        // res.status(200).json({
        //     message: "Successfyll added to cart",
        //     data: {
        //         ...data.toJSON(),
        //         product: product.toJSON()
        //     }
        // })
    }
    const product = await products.findByPk(productId)
    res.status(200).json({
        message: "Successfyll added to cart",
        data: {
            ...data.toJSON(),
            product: product.toJSON()
        }
    })
}