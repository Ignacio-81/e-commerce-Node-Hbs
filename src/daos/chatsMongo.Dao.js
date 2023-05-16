import { chats } from "../models/chats.models.js";
import MongoDao from "./mongo.Dao.js";

let instance;

export default class ChatsMongoDao extends MongoDao {
  constructor() {
    super(chats);
  }

  static getInstance() {
    if (!instance) instance = new ChatsMongoDao();
    return instance;
  }
}
