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
db.orders=require('./orderModel.js')(sequelize,DataTypes)



//!making relation between them
db.users.hasMany(db.orders)
db.orders.belongsTo(db.users)

db.products.hasMany(db.orders)
db.orders.belongsTo(db.products)


db.sequelize.sync({ force: false }).then(() => {
  console.log("yes re-sync done");
});

module.exports = db;