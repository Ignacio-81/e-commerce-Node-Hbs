import { carts } from "../models/carts.models.js";
import MongoDao from "./mongo.Dao.js";
/* 
Data Access Object Factory For Carts on Mongo DB
*/

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
