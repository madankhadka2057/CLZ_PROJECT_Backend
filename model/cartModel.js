const { DataTypes } = require("sequelize");
const { sequelize } = require(".");

module.exports=(sequelize,DataTypes)=>{
    const Cart=sequelize.define('cart',{
        quantity:{
            type:DataTypes.STRING,
            allowNull:false
        }
    })
    return Cart
}