import { Router } from "express";
import { CartsController } from "../controllers/index.js";
/* 
Carts Router
*/
const router = Router();
const cartsController = new CartsController();

router.route("/cart-checkout").get(cartsController.cartCheckout);
router.route("/").get(cartsController.getCart).post(cartsController.addCart);
router
  .route("/:id")
  .get(cartsController.getCartById)
  .post(cartsController.addProdToCart)
  .put(cartsController.modifProdInCart)
  .delete(cartsController.delCartById);

export default router;
