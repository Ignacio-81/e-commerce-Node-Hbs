import CustomError from "./CustomError.class.js";
import DBClient from "./DBClient.class.js";
import configSql from "../config/sqlConfig.js";
import knex from "knex";

export default class SqlClient extends DBClient {
  constructor() {
    super();
    this.connected = false;
    this.client = knex();
  }

  async connect() {
    try {
      await this.client(configSql);

      this.connected = true;

      console.log("SQLDB connected");
    } catch (err) {
      const error = new CustomError(500, "Error connecting to the database");
      console.log(error);

      throw error;
    }
  }

  async disconnect() {
    try {
      await this.client.destroy();

      this.connected = false;

      console.log("SQLDB disconnected!");
    } catch (err) {
      const error = new CustomError(500, "Error disconnecting to the database");
      console.log(error);

      throw error;
    }
  }
}
