//import { ProductMemDao } from "./productsMem.Dao.js";
import { ProductMongoDao } from "./productsMongo.Dao.js";
import { ProducSqlDao } from "./productsSql.Dao.js";
/* 
Data Access Object Factory for Products
*/
export default class ProductDaoFactory {
  static getDao(db) {
    switch (db) {
      case "MONGO":
        return ProductMongoDao.getInstance();
      /*       case "MEM":
        return ProductMemDao.getInstance(); */
      case "MySQL":
        return ProducSqlDao.getInstance();
    }
  }
}
