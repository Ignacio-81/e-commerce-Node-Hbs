import mongoose from "mongoose";
import CustomError from "./CustomError.class.js";
import DBClient from "./DBClient.class.js";
import config from "../config/config.js";

export default class MongoClient extends DBClient {
  constructor() {
    super();
    this.connected = false;
    this.client = mongoose;
  }

  async connect() {
    try {
      await this.client.connect(config.mongoDb, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });

      this.connected = true;

      console.log("MongoDB connected");
    } catch (err) {
      const error = new CustomError(500, "Error connecting to the database");
      console.log(error);

      throw error;
    }
  }

  async disconnect() {
    try {
      await this.client.connection.close();

      this.connected = false;

      console.log("MongoDB disconnected!");
    } catch (err) {
      const error = new CustomError(500, "Error disconnecting to the database");
      console.log(error);

      throw error;
    }
  }
}
