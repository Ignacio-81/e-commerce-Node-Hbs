import { cartsService } from "../services/index.js";

export default class CartsController {
  async getCart(req, res) {
    try {
      const response = await cartsService.getCartbyUser(req.user.username);
      res.status(200).json(response);
    } catch (e) {
      console.log(e);
      res
        .status(404)
        .send("The cart from : " + req.user.username + " does not exists");
    }
  }

  async getCartById(req, res) {
    try {
      const response = await cartsService.getCartsById(req.params.id);
      res.status(200).json(response);
    } catch (e) {
      console.log(e);
      res
        .status(404)
        .send("The cart with Id: " + req.params.id + " does not exists");
    }
  }
  async addCart(req, res) {
    const response = await cartsService.CreateCart(req.user.username, req.body);
    res
      .status(201)
      .send(
        "The cart for user : " + req.user.username + " was created successfully"
      );
  }

  async addProdToCart(req, res) {
    try {
      //const id = req.params.id ? Number(req.params.id) : null;
      const response = await cartsService.addProdToCartByUser(
        req.user.username,
        req.params.id
      );
      res.status(200).json(response);
    } catch (e) {
      console.log(e);
      res
        .status(404)
        .send(
          "The cart with for User: " +
            req.user.username +
            " Or the prod with ID: " +
            req.param.id +
            " does not exists"
        );
    }
  }

  async delProdById(req, res) {
    try {
      //const id = req.params.id ? Number(req.params.id) : null;
      await cartsService.delProdById(req.user.username, req.params.id);
      res
        .status(201)
        .send(
          "The cart with Id: " + req.params.id + " was deleted successfully"
        );
    } catch (e) {
      console.log(e);
      res
        .status(404)
        .send("The cart with Id: " + req.params.id + " does not exists");
    }
  }

  async modifProdInCart(req, res) {
    try {
      //const id = req.params.id ? Number(req.params.id) : null;
      await cartsService.modifProdInCartByUser(
        req.user.username,
        req.params.id,
        req.body
      );
      res
        .status(201)
        .send("The Product: " + req.params.id + " was modified succesfully");
    } catch (e) {
      console.log(e);
      res
        .status(404)
        .send("The cart with Id: " + req.params.id + " does not exists");
    }
  }
  /* async delProdById(req, res) {
    try {
      await cartsService.delProdByIdINCartById(
        req.params.id,
        req.params.id_prod
      );
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
  } */

  async cartCheckout(req, res) {
    try {
      //console.log(req.user);
      const response = await cartsService.cartCheckout(req.user);
      res
        .status(200)
        .send("The Oder: " + response + " was add or modified succesfully");
    } catch (e) {
      console.log(e);
      res.status(404).send("Error creating new User Order");
    }
  }
}
