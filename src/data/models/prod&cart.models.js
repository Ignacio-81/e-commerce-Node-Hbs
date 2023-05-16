import mongoose, { Schema } from "mongoose";

const prodsSchema = new Schema({
  name: { type: Schema.Types.String, require: true, max: 50 },
  description: { type: Schema.Types.String, require: true, max: 100 },
  code: { type: Schema.Types.Number, require: true, max: 10000 },
  price: { type: Schema.Types.Number, require: true, max: 100000 },
  thumbnail: { type: Schema.Types.String, require: true, max: 500 },
  stock: { type: Schema.Types.Number, require: true, max: 500 },
  timestamp: { type: Schema.Types.String, require: true, max: 50 },
});

const CartsSchema = new Schema({
  username: { type: Schema.Types.String, require: true, max: 50 },
  products: { type: Schema.Types.Array, require: true, max: 200 },
  timestamp: { type: Schema.Types.String, require: true, max: 50 },
});

export const products = mongoose.model("products", prodsSchema);
export const carts = mongoose.model("carts", CartsSchema);
