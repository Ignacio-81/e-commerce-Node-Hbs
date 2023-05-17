import { chatService } from "../services/index.js";
/* 
Chats Management Controller . 
*/
export default class ChatsController {
  async getChats(req, res) {
    try {
      const response = await chatService.findAllChats();
      res.status(200).json(response);
    } catch (e) {
      console.log(e);
      res.status(404);
    }
  }

  async getChatbyUser(req, res) {
    try {
      const response = await chatService.findAllChatsByUser(req.user.username);
      res.status(200).json(response);
    } catch (e) {
      console.log(e);
      res.status(404).send("No Chats for user : " + req.user.username);
    }
  }
  async createChat(req, res) {
    const response = await chatService.createChat(req.user.username);
    res
      .status(201)
      .send(
        "The chat for user : " + req.user.username + " was created successfully"
      );
  }

  async addMessageToChat(req, res) {
    try {
      const response = await chatService.saveMsg(req.user.username, req.body);
      res.status(200).json(response);
    } catch (e) {
      console.log(e);
      res
        .status(404)
        .send("Chat for User: " + req.user.username + " does not exists");
    }
  }
}
