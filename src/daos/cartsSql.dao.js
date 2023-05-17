import SqlDao from "./Sql.Dao.js";
/* 
Data Access Object Factory For Carts on MySQL
*/
let instance;

export class CartSqlDao extends SqlDao {
  constructor() {
    super("carts");
  }

  static getInstance() {
    if (!instance) instance = new CartSqlDao();

    return instance;
  }
}
