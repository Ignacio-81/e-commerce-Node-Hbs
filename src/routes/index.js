import auth_log_reg_Router from "./auth_log_reg.route.js";
import productsRouter from "./products.route.js";
import cartsRouter from "./carts.route.js";
import chatsRouter from "./chats.route.js";
import ordersRouter from "./order.route.js";
import { userlogin } from "../middleware/userlogin.js";
import { Router } from "express";
/* 
Router Manager Index
*/
const router = Router();
router.use(auth_log_reg_Router);
router.use("/api/products", productsRouter);
router.use("/api/carts", userlogin, cartsRouter);
router.use("/chats", userlogin, chatsRouter);
router.use("/order", userlogin, ordersRouter);

export default router;
