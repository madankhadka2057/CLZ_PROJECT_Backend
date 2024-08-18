

module.exports=(sequelize,DataTypes)=>{
    const orders=sequelize.define("order",{

        phoneNumber:{
            type:DataTypes.INTEGER,
            allowNull:false
        },
        shippingAddress:{
            type:DataTypes.STRING,
            allowNull:false
        },
        totalAmount:{
            type:DataTypes.DECIMAL,
            allowNull:false
        },
        orderStatus:{
            type:DataTypes.ENUM,
            values:["pending","delivered","preparation","ontheway","cancelled"],
            defaultValue:"panding",

        }
    })
    return orders
}