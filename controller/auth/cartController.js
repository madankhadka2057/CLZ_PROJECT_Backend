const { where, json } = require("sequelize");
const { products, carts, users } = require("../../model");

exports.addToCart = async (req, res) => {
    const productId = req.body.id;
    const quantity = parseInt(req.body.quantity)
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
    const newCart= await carts.findAll({
        where:{userId:userId},
        include: [
            {
                model: products,
            },
            {
                model: users,
            }
        ]
    })
    console.log(newCart)
    res.status(200).json({
    message: "Successfyll added to cart",
    data:newCart
    })
}
exports.fetchCart=async(req,res)=>{
    const userId= req.user.id;
    if(!userId){
        res.status(404).json({
            message:"Please provide useId"
        })
    }
    const data=await carts.findAll({
        where:{userId:userId},
        include: [
            {
                model: products,
            },
            {
                model: users,
            }
        ]
    })

    if(!data){
      return res.status(404).json({
        message:"Product not found with that userId"
       })
    }
    res.status(200).json({
        message:"Cart items fetch successfully",
        data:data
    })
}
exports.updateQuantity=async(req,res)=>{
    const {productId,quantity}=req.body
    console.log(productId)
    if(!productId||!quantity){
        return res.status(404).json({message:"product id and quantity is required field"})
    }
    const product=await products.findByPk(productId)
    if(!product){
        return res.status(404).json({message:"Product doesn't exit with that Id"})
    }
    const cartData= await carts.findOne({
        where:{productId:productId},
    })
    
    if(!cartData){
        return res.status(404).json({message:"Cart items is doesn't exist with that productId"})
    }
    cartData.quantity=quantity
    cartData.save()
    return res.json({message:"Quantity updated successfully"})
}


exports.DeleteCartItem=async(req,res)=>{
    console.log(req.body)
const {productId} =req.body
if(!productId){
    return res.status(404).json({
        message:"ProductId is required"
    })
}
const IsproductExist=await products.findByPk(productId)
if(!IsproductExist){
    return res.status(404).json({
        message:"Product doesn't exist with that productId"
    })
}
await carts.destroy({where:{productId:productId}})
res.status(200).json({message:"Product deleted successfully"})
}