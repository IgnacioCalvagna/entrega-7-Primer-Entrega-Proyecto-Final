const { promises: fs } = require("fs");
const Carrito = require("../models/carrito");
const misCarritos = [];

exports.addProduct = async (req, res, next) => {
  const newCarrito = new Carrito("./fakeData/carritos.txt");
  await newCarrito.getAll();
  misCarritos.push(newCarrito);
  await fs.writeFile(
    "./fakeData/carritos.txt",
    JSON.stringify(misCarritos, null, 2)
  );
  console.log("mi newCart---->", newCarrito);
  res.status(200).send(newCarrito);
};

exports.getAll = async (req, res, next) => {
  try {
    const carritos = await fs.readFile("./fakeData/carritos.txt", "utf8");
    res.send(JSON.parse(carritos));
  } catch (e) {
    return [];
  }
};
