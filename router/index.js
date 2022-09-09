const { Router } = require('express');
const router = Router();

const productos = require('./productos')
const carrito = require('./carrito')


router.use("/productos",productos)
router.use("/carrito",carrito)



module.exports = router