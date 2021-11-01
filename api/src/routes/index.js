const { Router } = require('express');
const usersRoutes = require('./users')
const categoriesRoutes = require('./categories')
const productsRoutes = require('./products')

const router = Router();

router.use('/users', usersRoutes)
router.use('/categories', categoriesRoutes)
router.use('/products', productsRoutes)

module.exports = router;