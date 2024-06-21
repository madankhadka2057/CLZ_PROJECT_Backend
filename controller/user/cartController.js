const { where } = require("sequelize");
const { products, carts } = require("../../model");

module.exports=addToCart=async(req,res)=>{
    const productId=req.body.id;
    const quantity=req.body.quantity
    const userId=req.user.id
    // console.log(productId,userId)
    if(!productId||!userId){
       return res.status(404).json({
            message:"productId or userId are required"
        })
    }
    const existProduct=await products.findByPk(productId)
    if(!existProduct){
        return res.status(400).json({
            message:"Product doesn't exist with that id"
        })
    }
    const cartItems=await carts.findOne({
        where:{
            productId,
            userId
        }
    })
   
    if(cartItems){
        console.log("madan !!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
        cartItems.quantity+=quantity
        await cartItems.save()
        return
    }else{
        const data= await carts.create({
            quantity,
            userId,
            productId
        })
        // console.log(data)
        res.status(200).json({
            message:"Successfyll added to cart",
            data:data
        })
    }



    

}