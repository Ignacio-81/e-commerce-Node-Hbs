import { model, Schema } from "mongoose";

const prodsSchema = new Schema({
  name: { type: Schema.Types.String, require: true, max: 50 },
  description: { type: Schema.Types.String, require: true, max: 100 },
  category: { type: Schema.Types.String, require: true, max: 20 },
  price: { type: Schema.Types.Number, require: true, max: 100000 },
  thumbnail: { type: Schema.Types.String, require: true, max: 10000 },
  stock: { type: Schema.Types.Number, require: true, max: 500 },
  timestamp: { type: Schema.Types.String, require: true, max: 50 },
});

export const products = model("products", prodsSchema);
