import SqlDao from "./Sql.Dao.js";

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
