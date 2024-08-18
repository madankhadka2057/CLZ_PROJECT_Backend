

module.exports=(sequelize,DataTypes)=>{
    const payments=sequelize.define("payment",{

        pidx:{
            type:DataTypes.STRING,
            allowNull:true
        },
        paymentMethod:{
            type:DataTypes.ENUM("cod","khalti","esewa"),
            allowNull:false
        },
        paymentStatus:{
            type:DataTypes.ENUM,
            values:["paid","unpaid"],
            defaultValue:"unpaid",

        }
    })
    return payments
}