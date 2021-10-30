const { Router } = require('express');
const usersRoutes = require('./users')

const router = Router();

router.use('/users', usersRoutes)

module.exports = router;