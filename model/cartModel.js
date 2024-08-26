const { DataTypes } = require("sequelize");
const { sequelize } = require(".");

module.exports=(sequelize,DataTypes)=>{
    const Cart=sequelize.define('cart',{
        id:{
            type:DataTypes.UUID,
            primaryKey:true,
            defaultValue: DataTypes.UUIDV4 
        },
        quantity:{
            type:DataTypes.INTEGER,
            allowNull:false
        }
    })
    return Cart
}