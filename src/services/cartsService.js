import { prodsService } from "../services/prodService.js";

import * as model from "../data/models/prod&cart.models.js";
import BDRepository from "../dataAccess/DBRepository.js";
import { mailService } from "./mailsService.js";
import { smsService } from "./smsService.js";

const cartsdata = new BDRepository(model.carts);

async function getCartsById(id) {
  try {
    if (id) {
      //const cartProds = [];
      //const cartArray = [];
      const cartsData = await cartsdata.findById(id);
      console.log(cartsData);
      //cartArray.push(cartsData);
      //const prods = cartsData.products;
      //if (!prods) {
      /* for (const prodtData of prods) {
        const doc = await prodsService.getProducts(prodtData.id);
        cartProds.push(doc);
      } */
      //}
      //cartArray.push(cartProds);
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

/* async function getCartsByUsername(username) {
  try {
    const cartsData = await cartsdata.findAll();
    const result = cartsData.find((item) => item.username == username);
    console.log(result);
    if (result) {
      return result;
    } else {
      console.log("No carts data found");
      throw new Error(`No data found`);
    }
  } catch (err) {
    throw new Error(err);
  }
} */

async function addCart() {
  try {
    let products = [];
    let today = new Date();
    let date = today.toLocaleString();
    const newP = { products, timestamp: date };
    const response = await cartsdata.save(newP);
    console.log(response);
    return response; // REVISAR ESTA LINEA PARA DEVOLVER RESPUESTA DE FIREBASE
  } catch (err) {
    throw new Error(err);
  }
}

async function modifCart(idCart, idProd) {
  try {
    if (idCart == 0 || idProd == 0) {
      throw new Error("Please send a valid id");
    } else {
      let today = new Date();
      let date = today.toLocaleString();
      const cartsData = await cartsdata.findById(idCart);
      console.log(cartsData);
      const products = cartsData.products;

      const doc = await prodsService.getProducts(idProd);
      console.log(doc);
      products.push({ id: idProd, cant: 1 });
      const newP = { products, timestamp: date };
      const response = await cartsdata.modif(idCart, newP);
      //Falta logica d saberi si el prod ya estaba en el carrito y modificar la cantidad.
      return response;
    }
  } catch (err) {
    throw new Error(err);
  }
}

async function delCartById(id) {
  try {
    if (id) {
      await cartsdata.deleteById(id);
    } else {
      throw new Error("Please send a valid id");
    }
  } catch (err) {
    throw new Error(err);
  }
}

async function delProdByIdINCartById(idCart, idProd) {
  try {
    if (idCart == 0 || idProd == 0) {
      throw new Error("Please send a valid id");
    } else {
      let today = new Date();
      let date = today.toLocaleString();
      const cartsData = await cartsdata.findById(idCart);
      const products = cartsData[0].products;
      const objId = products.findIndex((products) => products.id === idProd);
      if (objId != -1) {
        products.splice(objId, 1);
        const newP = { products, timestamp: date };
        const response = await cartsdata.modif(idCart, newP);
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
    //console.log(user.phone);
    const userCart = await getCartbyUser(user.username);
    //console.log(userCart.products);
    await mailService.sendMailCartPurchased(
      user.firstname,
      user.username,
      userCart.products
    );
    await smsService.sendWsp(userCart.products);
    await smsService.sendSms(user.phone);
  } catch (err) {
    throw new Error("Error while Cart Checkout" + err.message);
  }
}

async function getCartbyUser(user) {
  try {
    const cartsData = await cartsdata.findAll();
    const result = cartsData.find((item) => item.username == user.username);
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
  addCart,
  modifCart,
  delProdByIdINCartById,
  delCartById,
  cartCheckout,
  getCartbyUser,
};
