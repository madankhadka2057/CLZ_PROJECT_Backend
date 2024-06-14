const { DataTypes } = require("sequelize");
const { sequelize } = require(".");

module.exports=(sequelize,DataTypes)=>{
    const Product=sequelize.define("product",{
        // rs_id:{
        //     type:DataTypes.STRING,
        //     allowNull:false
        // }
        pName:{
            type:DataTypes.STRING,
            allowNull:false
        },
        discription:{
            type:DataTypes.STRING,
            allowNull:false
        },
        price:{
            type:DataTypes.DECIMAL,
            allowNull:false
        },
        img:{
            type:DataTypes.DECIMAL,
            allowNull:false
        }
    })
    return Product
}