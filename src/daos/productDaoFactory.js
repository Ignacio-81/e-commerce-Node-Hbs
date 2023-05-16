//import { ProductMemDao } from "./productsMem.Dao.js";
import { ProductMongoDao } from "./productsMongo.Dao.js";
import { ProducSqlDao } from "./productsSql.Dao.js";

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
