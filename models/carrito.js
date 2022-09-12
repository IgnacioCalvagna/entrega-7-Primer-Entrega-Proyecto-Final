const { promises: fs } = require("fs");
const Producto = require("../models/productos")

const productos = new Producto("./fakeData/productos.txt")
let newId = 1;

class Carrito {
  constructor(ruta) {
   this.ruta=ruta;
  }



  async createCart(newCart) {
   const carritos  = await this.getAll();
    carritos.push({  ...newCart  });
    newId ++;

    try {
      await fs.writeFile(this.ruta, JSON.stringify(carritos, null, 2));
      return newId;
    } catch (e) {
      console.log("error", e);
    }
  }

  
  async getAll() {
    try {
      const carritos = await fs.readFile(this.ruta, "utf8");
      return JSON.parse(carritos);
    } catch (e) {
      return [];
    }
  }

  async addProduct(cartId, productId) {
    const misCarritos = await this.getAll();
    const cEncontrado = misCarritos.find(carri => carri.id === parseInt(cartId))
    let salida
    if(cEncontrado){
      const misProductos = await productos.getAll();
      const pEncontrado = misProductos.find(product => product.id === parseInt(productId))
      if(pEncontrado){
       
        this.productos.push(pEncontrado)
        
      }else{
        salida= "Producto no encontrado"
      }

    }else{
      salida= "No se pudo hacer el request"
    }
    
    return salida
    
  }

  

  async getById(id) {
    let salida 
    const carrito  = await this.getAll();
    const carritoEncontrado = carritos.find(carrito => carrito.id === id)
    if(!carritoEncontrado) {
        salida = null;
    }else{

        salida=carritoEncontrado
    }
    
    return salida;
  }


  async deleteById (id){
    carritos = carritos.filter(carrito => carrito.id!==id);
    return carritos
  }
  
}

module.exports = Carrito;
