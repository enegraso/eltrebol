var express = require('express');

// Defino el modelo user para utilizarlo en las rutas correspondientes
const { User } = require('../models/index')

var router = express.Router();


// var bcryptjs = require ('bcryptjs')
// var bcryptjs = require ('bcryptjs')
// var bcryptjs = require ('bcryptjs')

/* router.post ('/login', async (req, res) =>{
  const username = req.body.email;
  const password = req.body.password;
  if(username == "mati" && password == '12345'){ // para prueba en postman
    var passwordHash = await bcryptjs.hash(password, 8)
    res.json({
      message:'Se autentico adecuadamente'
    })
  }else {
    res.json({
      message:'Email o contraseña equivocada'
    })
  }
}) */


// aquí voy a obtener el usuario en caso de que ya esté registrado
router.get('/login', async (req, res) => {
    // tomo del form de login el mail y la contraseña (aquí en query pero probaremos por body)
    const {username, password} = req.body
    // reviso que lleguen bien
    if (!username || username === "") {
      return res.status(400).json({"error":"el mail no existe"})
    }
    if (!password || password === "") {
      return res.status(400).json({"error":"la clave no existe"})
    }
    await User.findAll({
      where: {
        username: username,
        password: password
      }
    })
    .then(result => {
     if (result.length === 0) {
        return res.status(400).json({"error":"usuario y claves no enontrados"})
      } 
      res.status(200).json(result)
    })
    // res.send("get user")
})

router.post('/users', async (req, res) => {
    // tomo todos los campos del form de registro de usuario
    const {email, password, dni, name, lastname, birthdate} = req.body
    // chequeo que estén completos los 3 campos requeridos
    if (!email || email === "") {
      return res.status(400).json({'error':'Falta ingresar e-mail correspondiente'})
    }
    if (!password || password === "") {
      return res.status(400).json({'error':'Falta ingresar password correspondiente'})
    }
    if (!name || name === "") {
      return res.status(400).json({'error':'Falta ingresar name correspondiente'})
    }
    console.log("Objeto de usuario creado")
    // armo el objeto
    const objUser = {
      email,
      password,
      dni,
      name,
      lastname,
      birthdate
    }
    try {
      // envio los datos al modelo sequelize para que los guarde en la database
      let newUser = await User.create(objUser);
      // si todo sale bien devuelvo el objeto agregado
      console.log("Objeto de usuario guardado")
      res.send(objUser)
    } catch (error) {
      // en caso de error lo devuelvo al frontend
      console.log(error)
      res.status(500).json({ "error" : error});
    } 
})

module.exports = router;