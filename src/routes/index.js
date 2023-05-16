import { Router } from "express";
import passport from "passport";
import { prodsController } from "../controllers/prodController.js";
import { cartsController } from "../controllers/cartsController.js";
import { Controller } from "../controllers/index.js";
import { userAuth } from "../middleware/authlogin.js";
import { upload } from "../lib/storage.lib.js";

const router = Router();
//Will redirecto to main page, using user authentification.
router.get("/", userAuth, Controller.getIndexPage);
//route to login authentification, else will send to fail login
router.post(
  "/login",
  passport.authenticate("login", { failureRedirect: "/fail-login" }),
  Controller.postLogin
);
//send login status to front to know if user is still logged
router.get("/loginstatus", Controller.getLoginStatus);
//goes to Login page
router.get("/login", Controller.getLogin);
//go to log out page
router.get("/logout", userAuth, Controller.logout);
//go to register page
router.get("/register", Controller.postRegister);
//send register information and validate
router.post(
  "/register",
  passport.authenticate("register", { failureRedirect: "/fail-register" }),
  Controller.postRegister
);
//fail log in and register page
router.get("/fail-login", Controller.getLoginFailiure);
router.get("/fail-register", Controller.getRegisterFailiure);

router.get("/get-usercart", cartsController.getCartUser);
router.get("/cart-checkout", cartsController.cartCheckout);

router.post("/uploadFile", upload.single("myFile"), Controller.postUserPhoto);

//BASED ON 2ND DELIVER *******************************************************************************************
router
  .route("/api/products/:id?") //Get Products by id or get all products
  .get(prodsController.getProducts);
router.route("/api/products/").post(prodsController.addProduct);
router
  .route("/api/products/:id")
  .put(prodsController.modProduct)
  .delete(prodsController.delProduct);

router.route("/api/carts/:id/products").get(cartsController.getCarts); // Get product from a cart with cart ID
router.route("/api/carts/").post(cartsController.addCart); //Create a New Cart
router.route("/api/carts/:id").delete(cartsController.delCartById); //Delete CArt by ID

router
  .route("/api/carts/:id/products/:id_prod")
  .put(cartsController.modCartById) // add a product using the ID  to a cart with ID.3
  .delete(cartsController.delProdById); // Delete a product from the cart by ID and by Cart ID

//************************************************************************************************* */

export default router;
