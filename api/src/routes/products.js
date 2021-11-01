var express = require("express");

// Defino el modelo user para utilizarlo en las rutas correspondientes
const { Product} = require("../models/index");

var router = express.Router();

//todos los productos
router.get("/", (req, res, next) => {
  Product.findAll()
    .then((products) => {
      res.send(products);
    })
    .catch(next);
});

//producto por id
router.get("/:id", (req, res) => {
  let { id } = req.params;
  if (!id) return res.status(404).send("Este producto no existe");
  Product.findByPk(id).then((product) => {
    return res.status(200).send(product);
  });
});

//producto por categoria


// Agregar producto
router.post("/add", async (req, res) => {
  const { name, description, exist, price, image, isOfert, category } =
    req.body;
  if (!name || name === "") {
    return res
      .status(400)
      .send({ message: "Por favor, ingrese nombre de producto" });
  }
  if (!price || price < 0) {
    return res
      .status(400)
      .send({ message: "Por favor, ingrese precio de producto" });
  }
  if (!category || category === "") {
    return res
      .status(400)
      .send({ message: "Por favor, ingrese categoria/s de producto" });
  }
  const objProdAdd = {
    name,
    description,
    exist,
    price,
    image,
    isOfert,
  };
  const existProd = await Product.findOne({
    where: {
      name: name,
    },
  });

  if (!existProd) {
    try {
      let newProduct = await Product.create(objProdAdd); // envio los datos al modelo sequelize para que los guarde en la database

      await newProduct.setCategories(category); // seteo el/los temperamentos para sincronizarlos en la tabla relacionada

      return res.send(newProduct);
    } catch (err) {
      // en caso de error lo devuelvo al frontend
      return res.send({
        message: "No se pudo guardar el producto" + err,
      });
    }
  } else {
    return res.status(400).send({ message: "Producto existente" });
  }
});

module.exports = router;
