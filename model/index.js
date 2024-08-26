
const dbConfig = require("../config/dbConfig");
const { Sequelize, DataTypes} = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  port:3306,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});
sequelize
  .authenticate()
  .then(() => {
    console.log("MySQL Database Connected!!");
  })
  .catch((err) => {
    console.log("Error" + err);
  });

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// importing model files
db.products = require("./productModel.js")(sequelize, DataTypes);
db.users = require("./userModel.js")(sequelize, DataTypes);
db.carts=require('./cartModel.js')(sequelize,DataTypes)
db.orders=require('./orders.js')(sequelize,DataTypes)
db.payments=require('./payment.js')(sequelize,DataTypes)
db.orderDetails=require('./orderDetails.js')(sequelize,DataTypes)

// Cart relations
db.users.hasMany(db.carts,{freignkey:"userId"})
db.carts.belongsTo(db.users,{freignkey:"userId"})

db.products.hasMany(db.carts,{freignkey:"productId"})
db.carts.belongsTo(db.products,{freignkey:"productId"})

//OdrerDetails relation
db.products.hasMany(db.orderDetails,{freignkey:"productId"})
db.orderDetails.belongsTo(db.products,{freignkey:"productId"})
//order-orderDetails
db.orders.hasMany(db.orderDetails,{freignkey:"orderId"})
db.orderDetails.belongsTo(db.orders,{freignkey:"orderId"})

//order-Payment realation
db.payments.hasMany(db.orders,{freignkey:"paymentId"})
db.orders.belongsTo(db.payments,{freignkey:"paymentId"})
//order-user relation 
db.users.hasMany(db.orders,{foreignKey : 'userId'})
db.orders.belongsTo(db.users,{foreignKey : 'userId'})

db.sequelize.sync({ force:false}).then(() => {
  console.log("yes re-sync done");
});

module.exports = db;