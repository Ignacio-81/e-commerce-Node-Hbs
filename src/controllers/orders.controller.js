import { orderService } from "../services/index.js";

export default class OrderController {
  async getOrder(req, res) {
    try {
      const response = await orderService.getOrderbyUser(req.user.username);
      res.status(200).json(response);
    } catch (e) {
      console.log(e);
      res
        .status(404)
        .send("Order for : " + req.user.username + " does not exists");
    }
  }
}
