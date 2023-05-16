import auth_log_reg_Router from "./auth_log_reg.route.js";
import productsRouter from "./products.route.js";
import cartsRouter from "./carts.route.js";
import chatsRouter from "./chats.route.js";
import ordersRouter from "./order.route.js";
import { Router } from "express";

const router = Router();
router.use(auth_log_reg_Router);
router.use("/api/products", productsRouter);
router.use("/api/carts", cartsRouter);
router.use("/chats", chatsRouter);
router.use("/order", ordersRouter);

export default router;
