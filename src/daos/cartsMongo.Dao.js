import { carts } from "../models/carts.models.js";
import MongoDao from "./mongo.Dao.js";

let instance;

export class CartMongoDao extends MongoDao {
  constructor() {
    super(carts);
  }

  static getInstance() {
    if (!instance) instance = new CartMongoDao();

    return instance;
  }
}
