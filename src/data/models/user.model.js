import { model, Schema } from "mongoose";

const userSchema = Schema({
  username: { type: String },
  password: { type: String },
  firstname: { type: String },
  lastname: { type: String },
  age: { type: Number },
  phone: { type: String },
  address: { type: String },
});

export const User = model("user", userSchema);
