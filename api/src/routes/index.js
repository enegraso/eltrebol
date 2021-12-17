const { Router } = require('express');
const usersRoutes = require('./users')
const categoriesRoutes = require('./categories')
const productsRoutes = require('./products')
const ordersRoutes = require('./orders')
const mpagoRoutes = require('./mercadopago')
const pushRoutes = require('./webpush')

const router = Router();

router.use('/users', usersRoutes)
router.use('/categories', categoriesRoutes)
router.use('/products', productsRoutes)
router.use('/orders', ordersRoutes)
router.use('/mp', mpagoRoutes)
router.use('/push', pushRoutes)

router.get("/", (req,res) => {
    res.status(200).json({message:"backend - Chacinados El Trebol"})
})

module.exports = router;