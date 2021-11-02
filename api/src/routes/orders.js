var express = require("express");

// Defino el modelo user para utilizarlo en las rutas correspondientes
const { Order, orderLine } = require("../models/index");

var router = express.Router();

//listar todas las ordenes/pedidos
router.get("/", (req, res, next) => {
    Order.findAll()
      .then((orders) => {
        res.send(orders);
      })
      .catch(next);
  });


  module.exports = router;