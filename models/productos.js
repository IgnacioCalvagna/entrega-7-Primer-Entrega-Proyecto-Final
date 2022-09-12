const { promises: fs } = require("fs");

let newId = 1;

 class Producto {
  constructor(ruta) {
    this.ruta = ruta;
  }

  async save(newObject) {
    const productos = await this.getAll();
    productos.push({ id: newId, ...newObject });
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

    try {
      const prod = await productos.find((p) => p.id === id);

      console.log(JSON.stringify(prod));
    } catch (e) {
      console.log("error", e);
    }
  }



  
  async deleteById(id) {
    const productos = await this.getAll();
    const newArr = await productos.filter((p) => p.id !== id);
    try {
      console.log("Nuevo arr length", newArr.length);
      return await fs.writeFile(this.ruta, JSON.stringify(newArr, null, 2));
      //   return newArr;
    } catch (e) {
      console.log("error", e);
    }
  }

  async deleteAll() {
    let newArr = [];
    try {
      await fs.writeFile(this.ruta, JSON.stringify(newArr, null, 2));
      console.log("Nuevo arr length", newArr.length);
      return newArr;
    } catch (e) {
      console.log("error", e);
    }
  }
}



module.exports = Producto