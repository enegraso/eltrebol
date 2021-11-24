const express = require("express");
const morgan = require("morgan");
// const cors = require("cors"); // para poder hacer peticiones desde cualquier punto (tambien se puede configurar de donde recibir las peticiones)
const { conn, User, Product, Order, Category, OrderLine } = require("./src/models/index.js");
const routes = require("./src/routes/index");

const app = express();
const { PORT } = require("./src/utils/config/index.js");
const errorHandler = require("./src/utils/middlewares/errorHandler.js");
const setHeaders = require("./src/utils/middlewares/setHeaders.js");

// app.use(cors()); // uso de cors definido anteriormente
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(express.json({ limit: "50mb" }));
app.use(morgan("dev"));

app.use(errorHandler);
app.use(setHeaders);

app.use("/", routes);

const {
  initialCategories,
  initialProducts,
  initialUsers,
  initialOrders,
  initialOrderlines
} = require("./src/seed.js");


conn.sync({ force: true }).then(() => {
  console.log("Connect");
  app.listen(PORT, () => {
    console.log(`Listen on port ${PORT}`);
  }); /*  */
}).then(() => {
  User.bulkCreate(initialUsers)
}).then(() => {
  Category.bulkCreate(initialCategories)
}).then(() => {
  Product.bulkCreate(initialProducts)
}).then(() => {
  Order.bulkCreate(initialOrders)
}).then(() => {
  OrderLine.bulkCreate(initialOrderlines)
}).catch((error) => console.log('Error al bulkcreate', error))
