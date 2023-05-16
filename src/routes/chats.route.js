import { Router } from "express";
import { ChatsController } from "../controllers/index.js";
const router = Router();
const chatsController = new ChatsController();

router
  .route("/")
  .get(chatsController.getChatbyUser)
  .post(chatsController.addMessageToChat);

export default router;
