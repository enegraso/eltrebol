var express = require("express");

// Defino el modelo user para utilizarlo en las rutas correspondientes
const { Order, OrderLine, Product } = require("../models/index");

var router = express.Router();

//listar todas las ordenes/pedidos
router.get("/", async (req, res, next) => {
  try {
    let getAllOrders = await Order.findAll()
    return res.status(200).json(getAllOrders)
  } catch (err) {
    return res.status(500).json({ message: "No se pudo obtener listado de pedidos"+err})
  }

});


// Agregar pedidos y lineas de pedidos
router.post("/add", async (req, res) => {
  const {
    client,
    cellphone,
    address,
    subtotal,
    products,
    ordercart,
    status,
    delivery,
    payd,
  } = req.body;
  if (!client || client === "")
    return res
      .status(400)
      .json({ message: "Por favor, ingrese nombre de cliente" });
  if (!cellphone || cellphone.length !== 10)
    return res
      .status(400)
      .json({ message: "Por favor, ingrese nombre su numero de telefono" });
  if (!address || address === "")
    return res
      .status(400)
      .json({ message: "Por favor, ingrese direccion para su compra" });

  let objPedidoAdd = {
    client,
    cellphone,
    address,
    subtotal,
    products,
    ordercart,
    status,
    delivery,
    payd,
  };
  products.map(async (product) => {
    let objOrderLine = {
      quantity: product.cantidad,
      price: product.price,
      subtotal: product.subtotal,
      ordercart: product.ordercart,
    };
    let findProduct = await Product.findOne({ where: { id: product.id } });
    /* console.log("trae esto", findProduct); */
    let newOrderLine = await OrderLine.create(objOrderLine);
    await newOrderLine.setProduct(findProduct);
  });
  try {
    let newPedido = await Order.create(objPedidoAdd);

    return res.status(200).json({ message: "Pedido guardado exitosamente " });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "No se pudo guardar el pedido " + err });
  }
});

module.exports = router;
