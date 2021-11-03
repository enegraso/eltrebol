var express = require("express");

// Defino el modelo user para utilizarlo en las rutas correspondientes
const { Category } = require("../models/index");

var router = express.Router();

router.post("/add", async (req, res) => {
  const { category, description } = req.body;
  const objCatAdd = {
    category,
    description,
  };
  const existCat = await Category.findOne({
    where: {
      category: category,
    },
  });
  if (!existCat) {
    try {
      let newCategory = await Category.create(objCatAdd); // envio los datos al modelo sequelize para que los guarde en la database
      return res.send(newCategory);
    } catch (err) {
      // en caso de error lo devuelvo al frontend
      return res.send({
        message: "No se pudo guardar la categoría" + err,
      });
    }
  } else {
    return res.status(400).send({ message: "Categoría existente" });
  }
});

router.put("/update", async (req, res) => {
  const { id, category, description } = req.body;
  if (!category || category === "") {
    return res
      .status(400)
      .json({ error: "Falta ingresar categoría correspondiente" });
  }
  const objCatUpd = {
    id,
    category,
    description,
  };
  try {
    // envio los datos al modelo sequelize para que los guarde en la database
    let updCat = await Category.update(objCatUpd, {
      where: {
        id: id,
      },
    });
    // si todo sale bien devuelvo el objeto agregado
    console.log("Categoria modificada");
    res.send(objCatUpd);
  } catch (err) {
    // en caso de error lo devuelvo al frontend
    console.log(err);
    res.status(500).json({ error: err });
  }
});

router.get("/", async (req, res) => {
  try {
    let getAllCategories = await Category.findAll();
    return res.send(getAllCategories);
  } catch (err) {
    return res.send({
      message: "No se pudieron obtener las categorías" + err,
    });
  }
});

router.delete("/delete", async (req, res) => {
  const { category } = req.body;
  console.log(category);
  if (!category || category === "")
    return res.status(400).send({ message: "Debe ingresar categoría" });
  const existCat = await Category.findOne({
    where: {
      category: category,
    },
  });
  if (existCat) {
    try {
      let delCategory = await Category.destroy({
        where: {
          category: category,
        },
      });
      console.log(delCategory);
      return res.status(200).json({message:"Categoria " + category + " eliminada correctamente"});
    } catch (err) {
      return res
        .status(500)
        .json({ message: "No se pudo eliminar la categoría" + err });
    }
  } else {
    return res.status(400).json({ message: "Categoría inexistente" });
  }
});

module.exports = router;
