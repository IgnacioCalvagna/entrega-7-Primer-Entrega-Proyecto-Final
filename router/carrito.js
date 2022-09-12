const { Router } = require("express");
const router = Router();
const carritoController = require("../controllers/carritoController");



router.post("/",carritoController.addProduct);
router.get("/getAll",carritoController.getAll);



// router.get("/verProductos", async (req, res, next) => {
//   const misProductos = await fs.readFile("./fakeData/productos.txt", "utf8");
//   res.send(JSON.parse(misProductos));
// });

// router.post("/:id/productos", async (req, res) => {
//   await
// });



router.delete("/:id", async (req, res, next) => {
  const { id } = req.params;
  const carrito = await Carrito.deleteById(id);
  if (carrito) {
    res.status(200).send({ carritoBorrado: carrito });
  } else {
    res.status(404).json({ error: "carrito no encontrado" });
  }
});

module.exports = router;
