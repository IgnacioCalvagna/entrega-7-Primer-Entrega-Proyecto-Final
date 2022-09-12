const { promises: fs } = require("fs");

let newId = 1;

 class Producto {
  constructor(ruta) {
    this.ruta = ruta;
  }

  async save(newProduct) {
    const productos = await this.getAll();
    productos.push({ id: newId, ...newProduct });
    newId + 1;
    try {
      await fs.writeFile(this.ruta, JSON.stringify(productos, null, 2));
      return newId;
    } catch (e) {
      console.log("error", e);
    }
  }

  async getAll() {
    try {
      const productos = await fs.readFile(this.ruta, "utf8");
      return JSON.parse(productos);
    } catch (e) {
      return [];
    }
  }
  


  async getById(id) {
    const productos = await this.getAll();
    const producto = productos.find(producto=>producto.id== id)
    if(!producto) {
      return "No se encontro el producto"
    }
    return producto 
  }

  async deleteById(id) {
    const productos = await this.getAll();
    const newArr = await productos.filter(p => p.id !== parseInt(id));
    try { 
       return await fs.writeFile(this.ruta, JSON.stringify(newArr, null, 2));
    } catch (e) {
      console.log("error", e);
    }
  }

  //* a terminar el delete all
  // async deleteAll() {
  //   const productos = await this.getAll();
  //   productos= []
  //   try {
  //     await fs.writeFile(this.ruta, JSON.stringify(productos, null, 2));
  //     return newArr;
  //   } catch (e) {
  //     console.log("error", e);
  //   }
  // }
}



module.exports = Producto