const express = require("express");
const morgan = require("morgan");
// const cors = require("cors"); // para poder hacer peticiones desde cualquier punto (tambien se puede configurar de donde recibir las peticiones)
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
  conn,
  User,
  Product,
  Order,
  Category,
  Prod_Cat,
  OrderLine,
  Configs,
} = require("./src/models/index.js");


const {
  initialCategories,
  initialProducts,
  initialUsers,
  initialOrders,
  initialOrderlines,
  initialConfigs,
  categoryProducts
} = require("./src/seed.js");

const forzar = true
conn
  .sync({ force: forzar })
  .then(() => {
    console.log("Connect");
    app.listen(PORT, () => {
      console.log(`Listen on port ${PORT}`);
    });
  }) 
  .then(() => {
    if (forzar === true) User.bulkCreate(initialUsers);
  })/*
  .then(() => {
    if (forzar === true) Category.bulkCreate(initialCategories);
  })
  .then(() => {
    if (forzar === true) Product.bulkCreate(initialProducts);
  })  
    .then(() => {
    if (forzar === true) Prod_Cat.bulkCreate(categoryProducts);
  }) 
  .then(() => {
    if (forzar === true) Order.bulkCreate(initialOrders);
  })
  .then(() => {
    if (forzar === true) OrderLine.bulkCreate(initialOrderlines);
  }) */
  .then(() => {
    if (forzar === true) Configs.bulkCreate(initialConfigs);
  }) 
  .catch((error) => console.log("Error al bulkcreate", error));
 