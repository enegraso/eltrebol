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
    return res.status(400).json({ message: "No se pudo obtener listado de pedidos"+err})
  }
});

//listar ordenes/pedidos pendientes
router.get("/pending", async (req, res, next) => {
  try {
    let getAllOrders = await Order.findAll({
      where: {
        status: 'pending',
      }
    })
    return res.status(200).json(getAllOrders)
  } catch (err) {
    return res.status(400).json({ message: "No se pudo obtener listado de pedidos"+err})
  }
});

//listar ordenes/pedidos preparandose
router.get("/preparing", async (req, res, next) => {
  try {
    let getAllOrders = await Order.findAll({
      where: {
        status: 'preparing',
      }
    })
    return res.status(200).json(getAllOrders)
  } catch (err) {
    return res.status(400).json({ message: "No se pudo obtener listado de pedidos"+err})
  }
});

//listar ordenes/pedidos preparados
router.get("/prepared", async (req, res, next) => {
  try {
    let getAllOrders = await Order.findAll({
      where: {
        status: 'prepared',
      }
    })
    return res.status(200).json(getAllOrders)
  } catch (err) {
    return res.status(400).json({ message: "No se pudo obtener listado de pedidos"+err})
  }
});
//listar ordenes/pedidos listos
router.get("/done", async (req, res, next) => {
  try {
    let getAllOrders = await Order.findAll({
      where: {
        status: 'done',
      }
    })
    return res.status(200).json(getAllOrders)
  } catch (err) {
    return res.status(400).json({ message: "No se pudo obtener listado de pedidos"+err})
  }
});

//listar pedido por id
router.get("/:id", async (req, res, next) => {
  const  { id } = req.params
  try {
    let getAllOrdersbyId = await Order.findAll({
      where: { id },
      include: { model: OrderLine, include: { model : Product} }
    })
    return res.status(200).json(getAllOrdersbyId)
  } catch (err) {
    return res.status(400).json({ message: "No se pudo obtener listado de pedidos"+err})
  }
});

// borrar orden por id
router.delete("/delete/:id", async (req, res, next) => {
  const  { id } = req.params
  try {
    let delOrder = await Order.destroy({
      where: {
        id,
      },
    });
    console.log(delOrder);
    return res
      .status(200)
      .json({ message: "Pedido eliminada correctamente" });
  } catch (err) {
    return res
      .status(400)
      .json({ message: "No se pudo eliminar el pedido" + err });
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
  
  console.log(req.body);
  
  if (!client || client === "")
    return res
      .status(400)
      .json({ message: "Por favor, ingrese nombre de cliente" });
  if (!cellphone || cellphone.length !== 10)
    return res
      .status(400)
      .json({ message: "Por favor, ingrese su numero de telefono" });
  if (!address || address === "")
    return res
      .status(400)
      .json({ message: "Por favor, ingrese direccion para su compra" });
  let idpedido
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

  try {
    let newPedido = await Order.create(objPedidoAdd);
    
    console.log(newPedido.id)
    let findPedido = await Order.findOne({
      where: { id: newPedido.id }
    }) 

    idpedido = findPedido.id 
    console.log(idpedido)

  } catch (err) {
    return res
      .status(400)
      .json({ message: "No se pudo guardar el pedido " + err });
  }

  products.map(async (product) => {
    let objOrderLine = {
      quantity: product.quantity,
      price: product.price,
      image: product.image,
      subtotal: product.price * product.quantity,
      //ordercart: product.ordercart,
    };
    let findProduct = await Product.findOne({ where: { id: product.id } });
    /* console.log("trae esto", findProduct); */
    let newOrderLine = await OrderLine.create(objOrderLine);
    await newOrderLine.setProduct(findProduct);
    await newOrderLine.setOrder(idpedido)
  });

  return res.status(200).json({ message: "Pedido guardado exitosamente ", order: { ...objPedidoAdd, id: idpedido }});

});


router.put("/updstatus", (req,res) => {
  const { id, status } = req.body.order 
  console.log(req.body)
  Order.findByPk(id)
  .then((order) => {
    order.status = status;
    console.info("Salvando order");
    order
      .save()
      .then((_) => {
        console.info("redirect success");
          return res.status(200).json({message:"Pedido en preparacion"});
      })
      .catch((err) => {
        console.error("error al salvar", err);
             return res.status(400).json({message:"No se pudo cambiar el estado"});
      });
  })
  .catch((err) => {
    console.error("error al buscar", err);
    return res.status(400).json({message:"No se encontró el pedido"});

  });

})

module.exports = router;
