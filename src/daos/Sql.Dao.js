import SqlClient from "../classes/SqlClient.class.js";
/* 
Repository - Data Access Object Factory For MySQL DataBase. 
*/

export default class SqlDao {
  constructor(table) {
    this.table = table;
    this.database = new SqlClient();
  }

  async save(data) {
    try {
      console.log("Data para DB :" + data);
      const res = await this.database(this.table).insert(data);
      console.log("New Product Inserted");

      //this.database.destroy();
      return res;
    } catch (err) {
      //this.database.destroy();
      throw new Error(`Error while writing DataBase: ${err}`);
    }
  }
  async update(id, data) {
    try {
      await this.database(this.table).where({ id }).update(data);
    } catch (err) {
      throw new Error(`Error while updating data with id: ${err}`);
    }
  }
  async getById(id) {
    try {
      //Find object inside the array with the id
      const response = await database
        .from(this.table)
        .select("*")
        .where({ id });
      return response;
    } catch (err) {
      throw new Error(`Error while getting data with id: ${err}`);
    }
  }
  async getAll() {
    try {
      const data = await this.database.from(this.table).select("*");
      //this.database.destroy()
      return data;
    } catch (err) {
      //this.database.destroy();
      throw new Error(`Error while reading DataBase: ${err}`);
    }
  }

  async deleteById(id) {
    try {
      await this.database(this.table).where({ id }).del();
      console.log("Data with Id: " + id + " was deleted successfully");
    } catch (err) {
      throw new Error(`Error while deleting data with id: ${err}`);
    }
  }

  async deleteAll() {
    try {
      await this.database(this.table).del();
      console.log("All products were deleted successfully");
    } catch (err) {
      throw new Error(`Error while deleting all data from table: ${err}`);
    }
  }
}
