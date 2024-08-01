const { FOREIGNKEYS } = require("sequelize/lib/query-types");
const dbConfig = require("../config/dbConfig");
const { Sequelize, DataTypes, HasMany, BelongsTo } = require("sequelize");


// la sequelize yo config haru lag ani database connect gardey vaneko hae
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
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



//Cart relations
db.users.hasMany(db.carts,{freignkey:"userId"})
db.carts.belongsTo(db.users,{freignkey:"userId"})

db.products.hasMany(db.carts,{freignkey:"productId"})
db.carts.belongsTo(db.products,{freignkey:"productId"})

//OdrerDetails relation
db.products.hasMany(db.orderDetails,{freignkey:"productId"})
db.orderDetails.belongsTo(db.products,{freignkey:"productId"})

db.orders.hasMany(db.orderDetails,{freignkey:"orderId"})
db.orderDetails.belongsTo(db.orders,{freignkey:"orderId"})

//Payment realation
db.orders.hasMany(db.payments,{freignkey:"orderId"})
db.payments.belongsTo(db.orders,{freignkey:"orderId"})

db.sequelize.sync({ force: false }).then(() => {
  console.log("yes re-sync done");
});

module.exports = db;