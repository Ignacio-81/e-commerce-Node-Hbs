import SqlDao from "./Sql.Dao.js";

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
