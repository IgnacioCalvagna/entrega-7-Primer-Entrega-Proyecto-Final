const { Router } = require("express");
const router = Router();
const carritoController = require("../controllers/carritoController");

router.post("/",carritoController.createCart);
router.get("/getAll",carritoController.getAll);
router.get("/:id",carritoController.getById);
router.post("/:id/productos",carritoController.addProductToCart);
router.delete("/:id",carritoController.deleteById)

router.delete("/:id/productos/:idProd",carritoController.deleteProductInCart)

module.exports = router;
