import config from "../../config/sqLiteConfig.js";
import knex from "knex";
const database = knex(config);

const createChatTable = async (table) => {
  try {
    await database.schema.dropTableIfExists(table);

    await database.schema.createTable(table, (newTable) => {
      newTable.increments("id").primary();
      newTable.string("username", 25).notNullable();
      newTable.string("hourDate", 20).notNullable();
      newTable.string("message", 100).notNullable();
    });

    console.log(table + " table created in SQL lite!");
    //database.destroy();
  } catch (err) {
    database.destroy();
    throw new Error(`Error while creating DataBase: ${err}`);
  }
};
//createChatTable();
export default createChatTable;
