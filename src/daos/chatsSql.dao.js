import SqlDao from "./Sql.Dao.js";

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
