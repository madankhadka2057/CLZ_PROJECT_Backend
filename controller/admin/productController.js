
const { where } = require("sequelize")
const { products } = require("../../model")
const fs = require('fs')
//add product!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
exports.addProduct = async (req, res) => {
    const { pName, discription, price } = req.body
    const file = req.file
    let filePath
    if (file) {

        filePath = process.env.BACKEND_URL + req.file.filename
    }
    else {

        return res.status(404).json({
            message: "Please upload the image of food"
        })
        // filePath=process.env.BACKEND_URL+`image_processing20210908-13635-mxivfu.jpg`
    }

    if (!pName || !discription || !price) {
        return res.status(404).json({
            message: "All field are required"
        })
    }
    const checkProduct = await products.findAll({
        where: {
            pName
        }
    })
    if (checkProduct.length !== 0) {
        return res.status(404).json({
            message: "Product with this name is already exist"
        })
    }
    const data = await products.create({
        pName,
        discription,
        price,
        img: filePath
    })
    res.status(200).json({
        message: "Product created successfully",
        data: data
    });

}
exports.fetchAllProduct = async (req, res) => {
    const product = await products.findAll({})
    if (product.length !== 0) {
        res.status(200).json({
            message: "Product fetched successfully",
            data: product
        })
    } else {
        res.status(404).json({
            message: "Product is not available yet"
        })
    }

}
exports.fetchSingleProduct = async (req, res) => {
    console.log(req.params)
    const id = req.params.id
    const product = await products.findAll({ where: { id: id } })
    if (product.length !== 0) {
        res.status(200).json({
            message: "Product fetched successfully",
            data: product
        })
    } else {
        res.status(404).json({
            message: "Product not found with this id"
        })
    }

}
exports.deleteProduct = async (req, res) => {
    const id = req.params.id
    const product = await products.findByPk(id)
    if (!product) {
        return res.status(404).json({
            message: "Product doesn't exist with that id"
        })
    }
    const lengthOfBackendUrl = process.env.BACKEND_URL.length
    const img = product.img.slice(lengthOfBackendUrl)

    if (product) {
        await product.destroy()
        fs.unlink(`./uploads/${img}`, (err) => {
            if (err) {
                console.log("Error to delete image", err)
            } else {
                console.log("Image successfully deleted")

            }
        })
        res.status(200).json({
            message: "Product deleted successfully",
            data: product
        })
    } else {
        res.status(404).json({
            message: "Product not found with this id"
        })
    }

}
exports.updateProduct = async (req, res) => {
    const { id } = req.params
    if (!id) {
        return res.status(404).json({
            message: "Product doesn't found with that id"
        })
    }
    const { pName, discription, price } = req.body
    if (!pName || !discription || !price) {
        return res.status(404).json({
            message: "All field are required"
        })
    }
    const checkProduct = await products.findByPk(id)
    if (!checkProduct) {
        return res.status(404).json({
            message: "Product with this name is already exist"
        })
    }
    const oldImage=checkProduct.img
    const lengthOfBackendUrl=process.env.BACKEND_URL.length
    const cutOldImage=oldImage.slice(lengthOfBackendUrl)
    console.log(req.file)
    if(req.file&&req.file.filename)
        {
            fs.unlink(`./uploads/${cutOldImage}`,(err)=>{
                if(err){
                    console.log("Error to delete image",err)
                }else{
                    console.log("Image successfully deleted")
                    
                }
            })

    }
     await products.update({
        pName,
        discription,
        price,
        img: req.file && req.file.filename ?process.env.BACKEND_URL+req.file.filename:oldImage
    },{
        where:{
            id:id
        }
    })
    const data = await products.findAll();
    res.status(200).json({
        message: "Product Updated successfully",
        data: data
    });

}
