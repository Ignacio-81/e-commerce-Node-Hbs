import { cartsService } from "../services/cartsService.js";

async function getCarts(req, res) {
  try {
    //const id = req.params.id ? Number(req.params.id) : null;
    const response = await cartsService.getCartsById(req.params.id);
    res.status(200).json(response);
  } catch (e) {
    console.log(e);
    res
      .status(404)
      .send("The cart with Id: " + req.params.id + " does not exists");
  }
}

async function addCart(req, res) {
  const response = await cartsService.addCart();
  res
    .status(201)
    .send("The cart with Id: " + response + " was created successfully");
}

async function modCartById(req, res) {
  try {
    //const id = req.params.id ? Number(req.params.id) : null;
    const response = await cartsService.modifCart(
      req.params.id,
      req.params.id_prod
    );
    res.status(200).json(response);
  } catch (e) {
    console.log(e);
    res
      .status(404)
      .send(
        "The cart with Id: " +
          req.params.id +
          " Or de prod with ID: " +
          req.params.id_prod +
          " does not exists"
      );
  }
}

async function delCartById(req, res) {
  try {
    //const id = req.params.id ? Number(req.params.id) : null;
    await cartsService.delCartById(req.params.id);
    res
      .status(201)
      .send("The cart with Id: " + req.params.id + " was deleted successfully");
  } catch (e) {
    console.log(e);
    res
      .status(404)
      .send("The cart with Id: " + req.params.id + " does not exists");
  }
}

async function delProdById(req, res) {
  try {
    //const id = req.params.id ? Number(req.params.id) : null;
    await cartsService.delProdByIdINCartById(req.params.id, req.params.id_prod);
    res
      .status(201)
      .send(
        "The product with Id: " +
          req.params.id_prod +
          " was deleted successfully"
      );
  } catch (e) {
    console.log(e);
    res
      .status(404)
      .send(
        "The cart with Id: " +
          req.params.id +
          "Or de prod with ID: " +
          req.params.id_prod +
          " does not exists"
      );
  }
}

async function cartCheckout(req, res) {
  try {
    //console.log(req.user);
    await cartsService.cartCheckout(req.user);
    res.status(200);
  } catch (e) {
    console.log(e);
    res.status(404).send("Error sending wsp message");
  }
}

async function getCartUser(req, res) {
  try {
    //console.log(req.user);
    const cart = await cartsService.getCartbyUser(req.user);
    res.status(201).json(cart);
  } catch (e) {
    console.log(e);
    res.status(404).send("Error getting cart By User");
  }
}

export const cartsController = {
  getCarts,
  addCart,
  modCartById,
  delCartById,
  delProdById,
  cartCheckout,
  getCartUser,
};
