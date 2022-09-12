const { Router } = require("express");
const router = Router();
const Producto = require("../models/productos");
const productosController = require("../controllers/productosController");





router.post("/", productosController.addProduct);
router.get("/", productosController.getAll);
router.get("/:id", productosController.getById);
router.put("/:id", productosController.edit);
router.delete("/:id", productosController.delete);
router.delete("/deleteAll",productosController.deleteAll);

module.exports = router;
