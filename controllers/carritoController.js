const { promises: fs } = require("fs");
const Carrito = require("../models/carrito");
const Producto = require("../models/carrito");
const carritos = new Carrito("./fakeData/carritos.txt")
const productos = new Producto("./fakeData/productos.txt")

let id = 1;


exports.createCart= async (req, res, next) => {

const newCart = {id,productos:[],timestamp:new Date()}
 await carritos.createCart(newCart)
 id++
 res.send(newCart)
}

exports.getAll = async (req, res, next) => {
  try {
    const misCarritos = await carritos.getAll();
    res.send(misCarritos);
  } catch (e) {
    return [];
  }
};


exports.addProductToCart= async (req, res, next) => {
  
    const id = req.params.id
    const productId = req.body.productId

    const misCarritos = await carritos.getAll();
    const cEncontrado = misCarritos.find(carri => carri.id === parseInt(id))

    if(cEncontrado){
      const misProductos = await productos.getAll();
      const pEncontrado = misProductos.find(product => product.id === parseInt(productId))
      if(pEncontrado){
       
        cEncontrado.productos.push(pEncontrado)
        res.send(cEncontrado)
      }else{
        res.send("Producto no encontrado")
      }

    }else{
      res.status(500).send("No se pudo hacer el request")
    }
}

