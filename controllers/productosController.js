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
      //* CARGA CON FS

      misproductos.push(newProduct);
      await productos.save(newProduct);
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

  const producto = await productos.getById(id)
  producto?
    res.send(producto):
    res.status(400).send(producto)
};


exports.getAll = async (req, res, next) => {
  try {
    const misProductos = await productos.getAll();
    res.send(misProductos);
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
      const newProductos = productos.deleteById(id)
      res.send(newProductos);
    } else {
      res.status(401).send("ERROR---> no sos admin");
    }
  } catch (err) {
    next(err);
  }
};

exports.deleteAll=async (req, res, next)=>{
  try {
    if (admin) {
      const newProductos =await productos.deleteAll()
      res.send(newProductos);
      
    } else {
      res.status(401).send("ERROR---> no sos admin");
      
    }
  } catch (err) {
    next(err);
  }
}