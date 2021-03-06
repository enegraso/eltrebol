var express = require("express");

// Defino el modelo user para utilizarlo en las rutas correspondientes
const { User, Configs } = require("../models/index");

const generateToken = require("../utils/token");

var router = express.Router();

// Login del usuario admin
router.post("/login", async (req, res) => {
  // tomo del form de login el username y la contraseña (aquí por body)
  const { username, password } = req.body;
  console.log(username, password);
  // reviso que lleguen bien
  if (!username || username === "") {
    return res.status(400).json({ message: "Por favor, ingrese username" });
  }
  if (!password || password === "") {
    return res
      .status(400)
      .json({ message: "Por favor, ingrese la contraseña" });
  }
  await User.findAll({
    where: {
      username: username,
      password: password,
    },
  }).then((result) => {
    if (result.length === 0) {
      return res
        .status(400)
        .json({ message: "usuario y claves no enontrados" });
    }
    console.log(result);
    let objLogin = {
      username: result[0].username,
      id: result[0].id,
      name: result[0].name,
      email: result[0].email,
      isAdmin: result[0].isAdmin,
      token: generateToken(result[0]),
    };
    // token: generateToken(user)
    return res
      .status(200)
      .json({ message: "Usuario logueado con éxito", login: objLogin });
  });
  // res.send("get user")
});

router.put("/update", async (req, res) => {
  // tomo todos los campos del form de registro de usuario
  const { id, name, newpass, olduser, oldpass, email, token } = req.body.user;
  console.log(req.body.user);
  // chequeo que estén completos los 3 campos requeridos
  if (!olduser || olduser === "") {
    return res.status(400).json({ message: "Falta ingresar nombre usuario" });
  }
  if (!oldpass || oldpass === "") {
    return res
      .status(400)
      .json({ message: "Falta ingresar contraseña actual" });
  }
  if (!name || name === "") {
    return res
      .status(400)
      .json({ message: "Falta ingresar nombre correspondiente" });
  }
  if (newpass) {
    if (!oldpass || oldpass === "")
      return res
        .status(400)
        .json({ message: "Falta ingresar password anterior" });
  }
  let existUser = await User.findOne({
    where: {
      username: olduser,
      password: oldpass,
    },
  });
  if (!existUser)
    return res
      .status(400)
      .json({ message: "No tiene permisos para actualizar usuario" });
  // console.log("Objeto user modificar usuario creado")
  // armo el objeto
  const objUser = {
    username: existUser.username,
    name,
    password: newpass ? newpass : existUser.password,
    email,
    token,
  };
  try {
    // envio los datos al modelo sequelize para que los guarde en la database
    let newUser = await User.update(objUser, {
      where: {
        username: olduser,
        password: oldpass,
      },
    });
    // si todo sale bien devuelvo el objeto agregado
    // console.log("Objeto de usuario guardado")
    res
      .status(200)
      .json({ message: "usuario modificado con éxito", user: objUser });
  } catch (error) {
    // en caso de error lo devuelvo al frontend
    // console.log(error)
    res.status(400).json({ message: "No se pudo actualizar usuario" + error });
  }
});

//add user (quizás no se use)

router.post("/add", async (req, res) => {
  // tomo todos los campos del form de registro de usuario
  const { name, username, password, email } = req.body;
  // chequeo que estén completos los 3 campos requeridos
  if (!name || name === "") {
    return res
      .status(400)
      .json({ message: "Falta ingresar nombre correspondiente" });
  }
  if (!username || username === "") {
    return res
      .status(400)
      .json({ message: "Falta ingresar username correspondiente" });
  }
  if (!password || password === "") {
    return res
      .status(400)
      .json({ message: "Falta ingresar password correspondiente" });
  }
  const objUser = {
    name,
    username,
    password,
    email,
    isAdmin: true,
  };
  try {
    // envio los datos al modelo sequelize para que los guarde en la database
    let newUser = await User.create(objUser);
    // si todo sale bien devuelvo el objeto agregado
    console.log("Objeto de usuario guardado");
    res
      .status(200)
      .json({ message: "Usuario admin generado correctamente", user: objUser });
  } catch (error) {
    // en caso de error lo devuelvo al frontend
    console.log(error);
    res.status(500).json({ message: "No se pudo crear el admin" + error });
  }
});

// Datos de configuracion de la app

router.put("/configs", (req, res) => {
  const {
    id,
    business,
    slogan,
    messagewaenvio,
    messagewaretira,
    messagewareject,
    horario,
    deliveryprice,
  } = req.body;
  console.log(req.body);
  Configs.findByPk(id)
    .then((config) => {
      config.business = business,
      config.slogan = slogan,
      config.messagewaenvio = messagewaenvio,
      config.messagewaretira = messagewaretira,
      config.messagewareject = messagewareject,
      config.horario = horario,
      config.deliveryprice = deliveryprice,
      config.save().then((_) => {
        return res
          .status(200)
          .json({ message: "Configs Guardadas", config })

      })          .catch((err) => {
        return res
          .status(400)
          .json({ message: "No se pudo guardar", err });
      }); ;
    })
    .catch((err) => {
      return res.status(400).json({ message: err });
    });
});

router.get("/configs/:id", (req, res) => {
  const { id } = req.params;
  // console.log(req.params);
  Configs.findByPk(id)
    .then((config) => {
      // console.log(config);
      return res.status(200).json({ message: "Get config", config });
    })
    .catch((err) => {
      return res.status(400).json({ message: err });
    });
});

module.exports = router;
