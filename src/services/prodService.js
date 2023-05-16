import * as model from "../data/models/prod&cart.models.js";
import BDRepository from "../dataAccess/DBRepository.js";

//let proddata = Data.prodData;
const proddata = new BDRepository(model.products);

async function getProducts(id) {
  try {
    if (id) {
      let data = await proddata.findById(id);
      if (data) {
        return data;
      } else {
        console.log("The product with Id: " + id + " does not exists");
        throw new Error(`No data found`);
      }
    } else {
      console.log(id);
      const allProducts = await proddata.findAll();
      //const allProducts = await model.products.find({});
      return allProducts;
    }
  } catch (err) {
    throw new Error(err);
  }
}
async function addProduct(prod) {
  try {
    prod.price = parseInt(prod.price); //convert string number into number
    let today = new Date();
    let date = today.toLocaleString();
    //const newP = { 'id': id, ...newObj, 'timestamp': date }
    const newP = { ...prod, timestamp: date };
    const doc = await proddata.save(newP);
    return newP; // REVISAR ESTA LINEA PARA DEVOLVER RESPUESTA DE FIREBASE
  } catch (err) {
    throw new Error(err);
  }
}

async function modifProd(id, prod) {
  try {
    if (id) {
      let data = await proddata.modif(id, prod);
      return data;
    } else {
      throw new Error("Please send a valid id");
    }
  } catch (err) {
    throw new Error(err);
  }
}

async function delProd(id) {
  try {
    if (id) {
      await proddata.deleteById(id);
    } else {
      throw new Error("Please send a valid id");
    }
  } catch (err) {
    throw new Error(err);
  }
}

export const prodsService = {
  getProducts,
  addProduct,
  modifProd,
  delProd,
};
