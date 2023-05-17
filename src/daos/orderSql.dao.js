import SqlDao from "./Sql.Dao.js";
/* 
Data Access Object Factory For Carts on MySQL
*/
let instance;

export class OrderSqlDao extends SqlDao {
  constructor() {
    super("order");
  }

  static getInstance() {
    if (!instance) instance = new OrderSqlDao();

    return instance;
  }
}
