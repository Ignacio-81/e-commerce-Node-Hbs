import SqlDao from "./Sql.Dao.js";

let instance;

export class ProducSqlDao extends SqlDao {
  constructor() {
    super("products");
  }

  static getInstance() {
    if (!instance) instance = new ProductMongoDao();

    return instance;
  }
}
