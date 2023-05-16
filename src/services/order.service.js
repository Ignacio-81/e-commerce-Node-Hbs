import { mailService } from "./index.js";
import OrderDaoFactory from "../daos/orderDaoFactory.js";
import config from "../config/config.js";
import mongoose from "mongoose";

const orderApi = OrderDaoFactory.getDao(config.tipo_persistencia);

async function getOrders() {
  try {
    const orders = await orderApi.findAll();
    if (orders) return orders;
    else throw new Error(`No data found`);
  } catch (err) {
    throw new Error(err);
  }
}
async function getOrderbyUser(user) {
  try {
    const result = await orderApi.findByParam("username", user.toLowerCase());
    if (result) {
      return result;
    } else {
      console.log("No Order data found");
      throw new Error(`No data found`);
    }
  } catch (err) {
    throw new Error("Error find order by user in DB " + err);
  }
}

async function createOrder(cartsData) {
  const products = cartsData[0].products.map(({ name, description, qty }) => ({
    name,
    description,
    qty,
  }));
  let date = new Date().toLocaleString();
  let status = "generada";
  let username = cartsData[0].username; //user.toLocaleString();
  let orderNumber;
  const deliverAdd = cartsData[0].deliverAdd;
  const existingOrders = await getOrders();
  console.log("existing order : " + existingOrders);
  const lastObj = existingOrders.slice(-1)[0];
  if (lastObj) orderNumber = lastObj.orderNumber + 1;
  else orderNumber = 1;
  const newOrder = {
    products,
    orderNumber,
    timestamp: date,
    status,
    username,
    deliverAdd,
  };

  try {
    const response = await orderApi.create(newOrder);
    console.log(response);
    return newOrder;
  } catch (err) {
    throw new Error(err);
  }
}

async function createAndSendOrder(cartsData) {
  try {
    const newOrder = await createOrder(cartsData);
    if (newOrder) {
      await mailService.sendMailCartPurchased(newOrder.username, newOrder);
    }
    return newOrder;
  } catch (err) {
    throw new Error(err);
  }
}
/* async function modifProdInCartByUser(user, idProd, updateObj) {
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
      //let today = new Date();
      //let date = today.toLocaleString();

      // Define the update query
      const updateQuery = {};
      updateQuery[`products.${productIndex}.${updateObj.param}`] =
        updateObj.value;

      // Update the cart with the modified product
      const updatedCart = await orderApi.updateOne(cartsData._id, updateQuery);
      return updatedCart;
    }
  } catch (err) {
    throw new Error(err);
  }
} */
/* async function delCartById(id) {
  try {
    if (id) {
      await orderApi.deleteById(id);
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
        const response = await orderApi.modif(cartsData[0]._id, newP);
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
} */

/* async function cartCheckout(user) {
  try {
    const userCart = await getCartbyUser(user.username);
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
} */

export const orderService = {
  getOrders,
  createOrder,
  createAndSendOrder,
  getOrderbyUser,
};
