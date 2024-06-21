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



db.users.hasMany(db.carts,{freignkey:"userId"})
db.carts.belongsTo(db.users,{freignkey:"userId"})

db.products.hasMany(db.carts,{freignkey:"productId"})
db.carts.belongsTo(db.products,{freignkey:"productId"})




db.sequelize.sync({ force: false }).then(() => {
  console.log("yes re-sync done");
});

module.exports = db;