import { order } from "../models/order.models.js";
import MongoDao from "./mongo.Dao.js";
/* 
Data Access Object Factory For User Orders on Mongo DB
*/
let instance;

export class OrderMongoDao extends MongoDao {
  constructor() {
    super(order);
  }

  static getInstance() {
    if (!instance) instance = new OrderMongoDao();

    return instance;
  }
}
