import { CartMongoDao } from "./cartsMongo.Dao.js";
import { CartSqlDao } from "./cartsSql.dao.js";
/* 
Data Access Object Factory for User Carts.
*/
export default class CartDaoFactory {
  static getDao(db) {
    switch (db) {
      case "MONGO":
        return CartMongoDao.getInstance();
      //Future Add for Memory Persistance
      /*case "MEM":
        return CartMemDao.getInstance(); */
      case "MySQL":
        return CartSqlDao.getInstance();
    }
  }
}
