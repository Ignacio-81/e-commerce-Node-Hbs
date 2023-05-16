import { model, Schema } from "mongoose";

const OrderSchema = new Schema({
  products: { type: Schema.Types.Array, require: true, max: 200 },
  ordernumber: { type: Schema.Types.Number, require: true, max: 10 },
  timestamp: { type: Schema.Types.String, require: true, max: 50 },
  status: { type: Schema.Types.String, require: true, max: 10 },
  usermail: { type: Schema.Types.String, require: true, max: 30 },
});

export const order = model("order", OrderSchema);
