

module.exports=(sequelize,DataTypes)=>{
    const payments=sequelize.define("payment",{

        pidx:{
            type:DataTypes.INTEGER,
            allowNull:true
        },
        paymentMethod:{
            type:DataTypes.ENUM("cod","khalti","esewa"),
            allowNull:false
        },
        paymentStatus:{
            type:DataTypes.DECIMAL,
            allowNull:false
        },
        orderStatus:{
            type:DataTypes.ENUM,
            values:["paid","unpaid"],
            defaultValue:"unpaid",

        }
    })
    return payments
}