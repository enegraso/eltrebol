const { Sequelize } = require("sequelize");
const {
  dbUser,
  dbPassword,
  dbHost,
  dbName,
} = require("../utils/config/index.js");
const userModel = require("./users.js");
const categoryModel = require("./categories.js");
const orderModel = require("./orders");
const productModel = require("./products");

const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME } = process.env;
let sequelize =
  process.env.NODE_ENV === "production"
    ? new Sequelize({
        database: DB_NAME,
        dialect: "postgres",
        host: DB_HOST,
        port: 5432,
        username: DB_USER,
        password: DB_PASSWORD,
        pool: {
          max: 3,
          min: 1,
          idle: 10000,
        },
        dialectOptions: {
          ssl: {
            require: true,
            // Ref.: https://github.com/brianc/node-postgres/issues/2009
            rejectUnauthorized: false,
          },
          keepAlive: true,
        },
        ssl: true,
      })
    : new Sequelize(
        `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`,
        { logging: false, native: false }
      );

const User = userModel(sequelize);
const Product = productModel(sequelize);
const Category = categoryModel(sequelize);
const Order = orderModel(sequelize);

// Será necesario definir las relaciones


// Exports models

module.exports = {
  conn: sequelize,
  User,
  Product,
  Category,
  Order,
};

/* Activity.belongsTo(User)
User.hasMany(Activity)

Activity.belongsToMany(User, { through: 'favorite' });
User.belongsToMany(Activity, { through: 'favorite' }) */
