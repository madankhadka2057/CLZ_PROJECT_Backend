

module.exports=(sequelize,DataTypes)=>{
    const orders=sequelize.define("order",{
        id:{
            type:DataTypes.UUID,
            primaryKey:true,
            defaultValue: DataTypes.UUIDV4 
        },
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
            defaultValue:"pending",

        }
    })
    return orders
}