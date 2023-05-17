//import { CartMemDao } from "./cartsMem.dao.js";
import ChatsMongoDao from "./chatsMongo.Dao.js";
import { ChatSqlDao } from "./chatsSql.dao.js";
/* 
Data Access Object Factory for User Chats.
*/
export default class ChatsDaoFactory {
  static getDao(db) {
    switch (db) {
      case "MONGO":
        return ChatsMongoDao.getInstance();
      /*       case "MEM":
        return CartMemDao.getInstance(); */
      case "MySQL":
        return ChatSqlDao.getInstance();
    }
  }
}
