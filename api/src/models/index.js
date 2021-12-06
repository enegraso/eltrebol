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
const orderLineModel = require("./orderline");
const configsModel = require("./configs");

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
const OrderLine = orderLineModel(sequelize);
const Configs = configsModel(sequelize);
const Prod_Cat = (sequelize.models.prod_cat)

// Será necesario definir las relaciones

Product.belongsToMany(Category, { through: 'prod_cat' });
Category.belongsToMany(Product, { through: 'prod_cat' });

Product.hasMany(OrderLine);
OrderLine.belongsTo(Product);

Order.hasMany(OrderLine);
OrderLine.belongsTo(Order);

// console.log()
// Exports models

module.exports = {
  conn: sequelize,
  User,
  Product,
  Category,
  Order,
  OrderLine,
  Configs,
  Prod_Cat: sequelize.models.prod_cat
};
