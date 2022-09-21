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
exports.getById= async (req, res, next) => {
  const {id} = req.params
  try {
    const miCarro = await carritos.getById(id)
    console.log(miCarro)
    res.send(miCarro);
  }catch (e) {
    next(e); 
  }
}
exports.addProductToCart= async (req, res, next) => {
    const id = req.params.id
    const productId = req.body.productId
    try{
      const tryAdd = await carritos.addProduct(id, productId)
      res.send(tryAdd);
    }catch(e){
      next(e);
    }
}
exports.deleteById=async(req, res, next)=>{
  const {id} = req.params
  try{
    const borrarCarrito =await carritos.deleteById(id)
    console.log(borrarCarrito)
    res.send(borrarCarrito)
  }catch(e){
    next(e);
  }
}
exports.deleteProductInCart=async(req, res, next)=>{
  const id = req.params.id
  const pId = req.params.idProd
  
  let algo = await carritos.deleteProductInCart(id,pId)
res.send(algo)

}