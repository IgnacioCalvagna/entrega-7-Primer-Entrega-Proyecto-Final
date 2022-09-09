const { Router } = require("express");
const { promises: fs } = require("fs");
const router = Router();
const Carrito = require("../models/carrito");
// const carrito = new Carrito("./carritos.txt");
let id = 1;
const misCarritos = [];

router.post("/", async (req, res, next) => {
  const newCarrito = new Carrito("./carritos.txt");
  await newCarrito.getAll();

  misCarritos.push(newCarrito);
  id += 1;
  await fs.writeFile("./carritos.txt", JSON.stringify(misCarritos, null, 2));
  res.status(200).send(newCarrito);
});


router.get("/getAll", async (req, res, next) => {
  try {
    const carritos = await fs.readFile("./carritos.txt", "utf8");
    res.send(JSON.parse(carritos));
  } catch (e) {
    return [];
  }
});
router.get("/getAll", async (req, res, next) => {
    try {
      const carritos = await fs.readFile("./carritos.txt", "utf8");
      res.send(JSON.parse(carritos));
    } catch (e) {
      return [];
    }
  });
  




router.delete("/:id", async (req, res, next) => {
    const { id } = req.params;
    const carrito = await Carrito.deleteById(id);
    if(carrito) {
        res.status(200).send({carritoBorrado:carrito})
    }else{
      res.status(404).json({ error : 'carrito no encontrado' });
    }
  });
router.delete("/:id", (req, res, next) => {
  const { id } = req.params;
  const miCarri = carrito.find((c) => c.id === id);
  if (miCarri != undefined) {
    miCarri = [];
    res.send(miCarri);
  } else {
    res.send("no se encontro el carrito. ");
  }
});

router.get("/:id/productos", (req, res, next) => {
  const { id } = req.params;
  const miCarri = carrito.find((c) => c.id === id);
  if (miCarri != undefined) {
    res.send(miCarri.cont);
  } else {
    res.send(" no se encontraron productos en el carrito ");
  }
});

router.post("/algo/:carritoID/:productoID", (req, res, next) => {
    const cartId = req.params.id;
    const productId = req.body.productId;
  });
  

module.exports = router;
