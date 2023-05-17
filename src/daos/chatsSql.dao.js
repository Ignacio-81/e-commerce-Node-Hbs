import SqlDao from "./Sql.Dao.js";
/* 
Data Access Object Factory For User Chats on MySQL DB
*/
let instance;

export class ChatSqlDao extends SqlDao {
  constructor() {
    super("chats");
  }

  static getInstance() {
    if (!instance) instance = new ChatSqlDao();

    return instance;
  }
}
