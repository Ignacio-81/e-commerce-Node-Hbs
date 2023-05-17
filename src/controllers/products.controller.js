import { productService } from "../services/index.js";
/* 
Products Management Controller . 
*/
export default class ProductsController {
  async getProducts(req, res) {
    try {
      const response = await productService.getProducts(req.params.id);
      res.status(200).json(response);
    } catch (e) {
      console.log(e);
      res
        .status(404)
        .send("The product with Id: " + req.params.id + " does not exists");
    }
  }
  async getProdByCat(req, res) {
    try {
      const response = await productService.getProductsbyCat(
        req.params.category
      );
      res.status(200).json(response);
    } catch (e) {
      console.log(e);
      res
        .status(404)
        .send(
          "The product with category: " +
            req.params.category +
            " does not exists"
        );
    }
  }
  async addProduct(req, res) {
    const response = await productService.addProduct(req.body);
    res.status(201).json(response);
  }

  async modProduct(req, res) {
    try {
      const response = await productService.modifProd(req.params.id, req.body);
      res.status(200).json(response);
    } catch (e) {
      console.log(e);
      res
        .status(404)
        .send("The product with Id: " + req.params.id + " does not exists");
    }
  }

  async delProduct(req, res) {
    try {
      await productService.delProd(req.params.id);
      res
        .status(201)
        .send(
          "The product with Id: " + req.params.id + " was deleted successfully"
        );
    } catch (e) {
      console.log(e);
      res
        .status(404)
        .send("The product with Id: " + req.params.id + " does not exists");
    }
  }
}
