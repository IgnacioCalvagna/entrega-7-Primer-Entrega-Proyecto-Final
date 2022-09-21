const { promises: fs } = require("fs");
const Producto = require("../models/productos");
const productos = new Producto("./fakeData/productos.txt");

class Carrito {
  constructor(ruta) {
    this.ruta = ruta;
  }

  async createCart(newCart) {
    const carritos = await this.getAll();
    carritos.push(newCart);
    try {
      await fs.writeFile(this.ruta, JSON.stringify(carritos, null, 2));
      return newCart.id;
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
    const cEncontrado = await misCarritos.find(
      (c) => c.id === parseInt(cartId)
    );
    console.log("cEncontrado", cEncontrado);
    try {
      if (cEncontrado) {
        const pEncontrado = await productos.getById(productId);
        if (pEncontrado) {
          const agrego = cEncontrado.productos.push(pEncontrado);

          await fs.writeFile(this.ruta, JSON.stringify(misCarritos, null, 2));
        }

        return misCarritos;
      }
    } catch (e) {
      console.log(e);
    }
  }

  async getById(id) {
    let salida;
    const carritos = await this.getAll();
    const carritoEncontrado = carritos.find(
      (carrito) => carrito.id === parseInt(id)
    );
    if (!carritoEncontrado) {
      salida = null;
    } else {
      salida = carritoEncontrado;
    }

    return salida;
  }

  async deleteById(id) {
    const carritos = await this.getAll();
    const cEncontrado = await carritos.find((c) => c.id === parseInt(id));
    if (cEncontrado) {
      cEncontrado.productos = [];
      await fs.writeFile(this.ruta, JSON.stringify(carritos, null, 2));
      return carritos;
    }
    return null;
  }

  async deleteProductInCart(id,pId) {
    const misCarritos = await this.getAll();
    const cEncontrado = await misCarritos.find((c) => c.id === parseInt(id));

    if (cEncontrado) {
      const newArrProd=cEncontrado.productos.filter(p=>p.id !== parseInt(pId))
      cEncontrado.productos=newArrProd;
      await fs.writeFile(this.ruta, JSON.stringify(misCarritos, null, 2));
    }
    return misCarritos;
  }
}

module.exports = Carrito;
