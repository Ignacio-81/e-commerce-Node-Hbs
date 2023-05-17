import { model, Schema } from "mongoose";
/* 
ORder Model for Mongo DB
*/
const OrderSchema = new Schema({
  products: { type: Schema.Types.Array, require: true, max: 200 },
  orderNumber: { type: Schema.Types.Number, require: true, max: 100 },
  timestamp: { type: Schema.Types.String, require: true, max: 100 },
  status: { type: Schema.Types.String, require: true, max: 50 },
  username: { type: Schema.Types.String, require: true, max: 50 },
  deliverAdd: { type: Schema.Types.String, require: true, max: 100 },
});

export const order = model("order", OrderSchema);
