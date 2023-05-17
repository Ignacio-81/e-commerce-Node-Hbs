import { products } from "../models/products.models.js";
import MongoDao from "./mongo.Dao.js";
/* 
Data Access Object Factory For Products on Mongo DB
*/
let instance;

export class ProductMongoDao extends MongoDao {
  constructor() {
    super(products);
  }

  static getInstance() {
    if (!instance) instance = new ProductMongoDao();

    return instance;
  }
}
