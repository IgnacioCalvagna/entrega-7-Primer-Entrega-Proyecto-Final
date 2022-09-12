const { promises: fs } = require("fs");
const Producto = require("../models/Productos");
const productos = new Producto("./fakeData/productos.txt");

const admin = true;
let id = 1;
const misproductos = [];

exports.addProduct = async (req, res, next) => {
  await productos.getAll();
  const { nombre, descripcion, codigo, img, precio, stock } = req.body;
  try {
    if (admin) {
      let timestamp = new Date();
      const newProduct = {
        id,
        nombre,
        descripcion,
        codigo,
        img,
        precio,
        stock,
        timestamp,
      };
      ///* CARGA CON FS

      misproductos.push(newProduct);
      await fs.writeFile(
        "./fakeData/productos.txt",
        JSON.stringify(misproductos, null, 2)
      );
      res.status(201).send(newProduct);
      id++;
    } else {
      res.status(401).send("ERROR---> no sos admin");
    }
  } catch (err) {
    next(err);
  }
};
exports.getById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const producto = await misproductos.find((producto) => producto.id == id);
    if (producto === undefined) {
      res.send({ error: "producto no encontrado " });
    } else {
      res.send(producto);
    }
  } catch (err) {
    next(err);
  }
};
exports.getAll = async (req, res, next) => {
  try {
    const productos = await fs.readFile("./fakeData/productos.txt", "utf8");
    res.send(JSON.parse(productos));
  } catch (e) {
    return [];
  }
};
exports.edit = async (req, res, next) => {
  const { id } = req.params;
  
  const { nombre,descripcion,codigo, precio, stock } = req.body;
  try {
    if (admin) {
      const prodEdit = misproductos.find((producto) => producto.id === Number(id));
      if (!prodEdit) {
        res.send({ error: "producto no encontrado" });
      } else {
        misproductos.pop(prodEdit);
        const editado = { id,nombre,descripcion,codigo, precio, stock };
        misproductos.push(editado);
        await fs.writeFile(
          "./fakeData/productos.txt",
          JSON.stringify(misproductos, null, 2)
        );
        res.send(editado);
      }
    } else {
      res.status(401).send("ERROR---> no sos admin");
    }
  } catch (err) {
    next(err);
  }
};
exports.delete = (req, res, next) => {
  const { id } = req.params;
  try {
    if (admin) {
      let newArr = productos.filter((producto) => producto.id != id);
      productos = newArr;
      res.send(productos);
    } else {
      res.status(401).send("ERROR---> no sos admin");
    }
  } catch (err) {
    next(err);
  }
};
