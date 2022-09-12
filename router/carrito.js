const { Router } = require("express");
const router = Router();
const carritoController = require("../controllers/carritoController");



router.post("/",carritoController.createCart);
router.get("/getAll",carritoController.getAll);
router.post("/:id/productos",carritoController.addProductToCart);



// router.get("/verProductos", async (req, res, next) => {
//   const misProductos = await fs.readFile("./fakeData/productos.txt", "utf8");
//   res.send(JSON.parse(misProductos));
// });




// router.delete("/:id", async (req, res, next) => {
//   const { id } = req.params;
//   const carrito = await Carrito.deleteById(id);
//   if (carrito) {
//     res.status(200).send({ carritoBorrado: carrito });
//   } else {
//     res.status(404).json({ error: "carrito no encontrado" });
//   }
// });

module.exports = router;
