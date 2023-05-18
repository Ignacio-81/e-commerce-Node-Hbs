import SqlDao from "./Sql.Dao.js";
/* 
Data Access Object Factory For Products on MySQL DB
*/
let instance;

export class ProducSqlDao extends SqlDao {
  constructor() {
    super("products");
  }

  static getInstance() {
    if (!instance) instance = new ProducSqlDao();

    return instance;
  }
}
