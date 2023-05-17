import { Router } from "express";
import { ProductsController } from "../controllers/index.js";

/* 
Products Router
*/
const router = Router();
const prodsController = new ProductsController();

router.route("/:id?").get(prodsController.getProducts);
router.route("/").post(prodsController.addProduct);
router
  .route("/:id")
  .put(prodsController.modProduct)
  .delete(prodsController.delProduct);
router.route("/category/:category").get(prodsController.getProdByCat);
export default router;
