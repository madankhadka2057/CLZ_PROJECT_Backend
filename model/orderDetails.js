
module.exports=(sequelize,DataTypes)=>{
    const orderDetails=sequelize.define("orderDetail",{
        id:{
            type:DataTypes.UUID,
            primaryKey:true,
            defaultValue: DataTypes.UUIDV4 
        },
        quantity:{
            type:DataTypes.INTEGER,
            allowNull:false
        },
       
    })
    return orderDetails
}