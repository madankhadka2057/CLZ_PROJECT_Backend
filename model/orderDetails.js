
module.exports=(sequelize,DataTypes)=>{
    const orderDetails=sequelize.define("orderDetail",{

        quantity:{
            type:DataTypes.INTEGER,
            allowNull:false
        },
       
    })
    return orderDetails
}