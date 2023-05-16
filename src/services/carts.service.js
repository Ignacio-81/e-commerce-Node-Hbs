import { productService, orderService } from "./index.js";
import CartDaoFactory from "../daos/cartDaoFactory.js";
import config from "../config/config.js";
import mongoose from "mongoose";

const cartsApi = CartDaoFactory.getDao(config.tipo_persistencia);

async function getCartsById(id) {
  try {
    if (id) {
      const cartsData = await cartsApi.findById(id);
      console.log(cartsData);
      if (cartsData) {
        return cartsData;
      } else {
        console.log("The product with Id: " + id + " does not exists");
        throw new Error(`No data found`);
      }
    } else {
      throw new Error("Id must have a valid Id number");
    }
  } catch (err) {
    throw new Error(err);
  }
}

async function CreateCart(user, address) {
  try {
    let products = [];
    let deliverAdd = address.userAddress.toLocaleString();
    let username = user.toLocaleString();
    let today = new Date();
    let date = today.toLocaleString();
    const newP = { username, products, deliverAdd, timestamp: date };
    const response = await cartsApi.create(newP);
    console.log(response);
    return response;
  } catch (err) {
    throw new Error(err);
  }
}

async function addProdToCartByUser(user, idProd) {
  try {
    if (idProd == 0) {
      throw new Error("Please send a valid Product id");
    } else {
      let today = new Date();
      let date = today.toLocaleString();
      const cartsData = await getCartbyUser(user);
      console.log(cartsData);
      const products = cartsData[0].products;
      const prodDB = await productService.getProducts(idProd);
      const index = products.findIndex(
        (product) => product._id.toString() === idProd.toString()
      );
      if (index !== -1) {
        // If the product already exists in the cart, increase its quantity by 1
        products[index].qty++;
      } else {
        // If the product doesn't exist in the cart, add it with a quantity of 1
        products.push({ ...prodDB.toObject(), qty: 1 });
      }
      console.log("prod con cantidad" + products);
      const newP = { products, timestamp: date };
      console.log(newP);
      const response = await cartsApi.modif(cartsData[0]._id, newP);
      return response;
    }
  } catch (err) {
    throw new Error(err);
  }
}

async function modifProdInCartByUser(user, idProd, updateObj) {
  try {
    if (idProd == 0) {
      throw new Error("Please send a valid Product id");
    } else {
      const cartsData = await getCartbyUser(user);
      if (!cartsData) {
        throw new Error(`Cart with user ${user} not found`);
      }
      // Find the product with the given _id in the cart's products array
      const productIndex = cartsData[0].products.findIndex(
        (product) =>
          product._id.toString() === mongoose.Types.ObjectId(idProd).toString()
      );
      if (productIndex === -1) {
        throw new Error(`Product with ID ${idProd} not found in cart`);
      }
      console.log(cartsData[0].products[productIndex]);
      // Define the update query
      const updateQuery = {};
      updateQuery[`products.${productIndex}.${updateObj.param}`] =
        updateObj.value;
      // Update the cart with the modified product
      const updatedCart = await cartsApi.updateOne(cartsData._id, updateQuery);
      return updatedCart;
    }
  } catch (err) {
    throw new Error(err);
  }
}
async function delCartById(id) {
  try {
    if (id) {
      await cartsApi.deleteById(id);
    } else {
      throw new Error("Please send a valid id");
    }
  } catch (err) {
    throw new Error(err);
  }
}

async function delProdById(user, idProd) {
  try {
    if (idProd == 0) {
      throw new Error("Please send a valid id");
    } else {
      let today = new Date();
      let date = today.toLocaleString();
      const cartsData = await getCartbyUser(user);
      const products = cartsData[0].products;
      const objId = products.findIndex(
        (product) =>
          product._id.toString() === mongoose.Types.ObjectId(idProd).toString()
      );
      if (objId != -1) {
        products.splice(objId, 1);
        const newP = { products, timestamp: date };
        const response = await cartsApi.modif(cartsData[0]._id, newP);
        return response;
      } else {
        throw new Error(
          "The Product ID " + idProd + " does not exists on this cart"
        );
      }
    }
  } catch (err) {
    throw new Error(err);
  }
}

async function cartCheckout(user) {
  try {
    const cartsData = await getCartbyUser(user.username);
    return await orderService.createAndSendOrder(cartsData);
  } catch (err) {
    throw new Error("Error while Cart Checkout" + err.message);
  }
}

async function getCartbyUser(user) {
  try {
    const result = await cartsApi.findByParam("username", user.toLowerCase());
    if (result) {
      return result;
    } else {
      console.log("No carts data found");
      throw new Error(`No data found`);
    }
  } catch (err) {
    throw new Error("Error find cart by user in DB " + err);
  }
}

export const cartsService = {
  getCartsById,
  CreateCart,
  delProdById,
  addProdToCartByUser,
  delCartById,
  cartCheckout,
  getCartbyUser,
  modifProdInCartByUser,
};
