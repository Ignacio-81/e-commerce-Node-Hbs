import ProductDaoFactory from "../daos/productDaoFactory.js";
import config from "../config/config.js";
/* 
Products Service
*/
const productApi = ProductDaoFactory.getDao(config.tipo_persistencia);

async function getProducts(id) {
  try {
    if (id) {
      let data = await productApi.findById(id);
      if (data) {
        return data;
      } else {
        console.log("The product with Id: " + id + " does not exists");
        throw new Error(`No data found`);
      }
    } else if (id === undefined || id === null) {
      const allProducts = await productApi.findAll();
      console.log("all prods : " + allProducts);
      return allProducts;
    }
  } catch (err) {
    throw new Error(err);
  }
}

async function getProductsbyCat(catvalue) {
  try {
    console.log("getProductsbyCat: " + catvalue);
    let data = await productApi.findByParam("category", catvalue.toLowerCase());
    if (data) {
      return data;
    } else {
      console.log(
        "The product with category : " + catvalue + " does not exists"
      );
      throw new Error(`No data found`);
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
    let newP = { ...prod, timestamp: date };
    const doc = await productApi.create(newP);
    newP = { _id: doc._id, ...newP };
    return newP;
  } catch (err) {
    throw new Error(err);
  }
}

async function modifProd(id, prod) {
  try {
    if (id) {
      let data = await productApi.modif(id, prod);
      data = { _id: id, ...data };
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
      await productApi.deleteById(id);
    } else {
      throw new Error("Please send a valid id");
    }
  } catch (err) {
    throw new Error(err);
  }
}

export const productService = {
  getProducts,
  addProduct,
  modifProd,
  delProd,
  getProductsbyCat,
};
