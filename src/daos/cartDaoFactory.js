//import { CartMemDao } from "./cartsMem.dao.js";
import { CartMongoDao } from "./cartsMongo.Dao.js";
import { CartSqlDao } from "./cartsSql.dao.js";

export default class CartDaoFactory {
  static getDao(db) {
    switch (db) {
      case "MONGO":
        return CartMongoDao.getInstance();
      /*       case "MEM":
        return CartMemDao.getInstance(); */
      case "MySQL":
        return CartSqlDao.getInstance();
    }
  }
}
