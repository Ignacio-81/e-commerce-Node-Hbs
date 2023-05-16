import { model, Schema } from "mongoose";

const CartsSchema = new Schema({
  username: { type: Schema.Types.String, require: true, max: 100 },
  products: { type: Schema.Types.Array, require: true, max: 200 },
  deliverAdd: { type: Schema.Types.String, require: true, max: 100 },
  timestamp: { type: Schema.Types.String, require: true, max: 100 },
});

export const carts = model("carts", CartsSchema);
