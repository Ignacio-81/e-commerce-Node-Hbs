import { chats } from "../models/chats.models.js";
import MongoDao from "./mongo.Dao.js";

/* 
Data Access Object Factory For User Chats on Mongo DB
*/
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
