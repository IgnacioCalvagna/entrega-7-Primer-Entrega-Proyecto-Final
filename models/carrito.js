const { promises: fs } = require("fs");
const Producto = require("../models/productos")

let newId = 1;
let carritos 
class Carrito {
  constructor(ruta) {
    this.id=newId ++
    this.productos= [{id:1,producto:"Iphone13"}]
    this.timestamp = new Date()
  }

  async createCart(newCart) {
    carritos  = await this.getAll();
    carritos.push({ id, ...newCart  });
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
