var express = require("express");

// Defino el modelo user para utilizarlo en las rutas correspondientes
const { Product, Category } = require("../models/index");

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
  console.log(id)
  if (!id) return res.status(400).send("Este producto no existe");
  Product.findByPk(id).then((product) => {
    if (!product) 
      return res.status(400).json({ message: "No se encontró producto con id: " + id}); 
    return res.status(200).json(product);
  });
});

//producto por categoria

router.get("/bycat/:category", (req, res) => {
  let { category } = req.params;
  if (!category || category === "")
    return res.status(400).send("Por favor, ingrese categoría");
  Category.findAll({
    where: { category: category },
    include: { model: Product },
  }).then((s) => {
    if (s.length === 0) 
      return res.status(400).json({ message: "No se encontró producto con categoria: " + category}); 
    res.json(s);
  });
});

// Agregar producto
router.post("/add", async (req, res) => {
  const {
    name,
    description,
    exist,
    price,
    image,
    isOfert,
    categories,
    units,
    minunit,
    stepunit,
  } = req.body;
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
  if (!categories) {
    return res
      .status(400)
      .send({ message: "Por favor, ingrese categoria/s del producto" });
  }
  if (!units || units === "") {
    return res
      .status(400)
      .send({ message: "Por favor, ingrese nombre de cantidad del producto" });
  }
  if (!minunit || minunit === 0) {
    return res.status(400).send({
      message: "Por favor, ingrese cantidad minima, a vender, del producto",
    });
  }
  if (!stepunit || stepunit === 0) {
    return res.status(400).send({
      message:
        "Por favor, ingrese de a cuanto incrementar la cantidad a vender, del producto",
    });
  }
  const objProdAdd = {
    name,
    description,
    exist,
    price,
    image,
    isOfert,
    units,
    minunit,
    stepunit,
  };
  const existProd = await Product.findOne({
    where: {
      name: name,
    },
  });

  if (!existProd) {
    try {
      let newProduct = await Product.create(objProdAdd); // envio los datos al modelo sequelize para que los guarde en la database

      await newProduct.setCategories(categories); // seteo el/los temperamentos para sincronizarlos en la tabla relacionada

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

//modificar producto
router.put("/update/:id", async (req, res) => {
  const {
    name,
    description,
    exist,
    price,
    image,
    isOfert,
    categories,
    units,
    minunit,
    stepunit,
  } = req.body;
  const { id } = req.params;
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
  if (!categories) {
    return res
      .status(400)
      .send({ message: "Por favor, ingrese categoria/s del producto" });
  }
  if (!units || units === "") {
    return res
      .status(400)
      .send({ message: "Por favor, ingrese nombre de cantidad del producto" });
  }
  if (!minunit || minunit === 0) {
    return res.status(400).send({
      message: "Por favor, ingrese cantidad minima, a vender, del producto",
    });
  }
  if (!stepunit || stepunit === 0) {
    return res.status(400).send({
      message:
        "Por favor, ingrese de a cuanto incrementar la cantidad a vender, del producto",
    });
  }
  const objProdUpd = {
    name,
    description,
    exist,
    price,
    image,
    isOfert,
    units,
    minunit,
    stepunit,
  };
  const existProd = await Product.findOne({
    where: {
      id,
    },
  });
  if (existProd) {
    try {
      // envio los datos al modelo sequelize para que los guarde en la database
      let updProd = await Product.update(objProdUpd, {
        where: {
          id,
        },
      });
      // si todo sale bien devuelvo el objeto agregado
      console.log("Producto modificado");
      return res.send(objProdUpd);
    } catch (err) {
      // en caso de error lo devuelvo al frontend
      console.log(err);
      return res.status(500).json({ error: err });
    }
  } else {
    return res
      .status(400)
      .json({ message: "No existe el producto a modificar" });
  }
});

router.delete('/delete/:id', async (req,res) => {
  const { id } = req.params;
  /* console.log(name); */
  if (!id)
    return res.status(400).send({ message: "Debe ingresar producto" });
  const existProd = await Product.findOne({
    where: {
      id,
    },
  });
  if (existProd) {
    try {
      let delProduct = await Product.destroy({
        where: {
          id,
        },
      });
      console.log(delProduct);
      return res.status(200).json({message:"Producto eliminado correctamente"});
    } catch (err) {
      return res
        .status(500)
        .json({ message: "No se pudo eliminar el producto" + err });
    }
  } else {
    return res.status(400).json({ message: "Producto inexistente" });
  }
})

module.exports = router;
