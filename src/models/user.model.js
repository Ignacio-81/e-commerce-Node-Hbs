import { model, Schema } from "mongoose";

const userSchema = Schema({
  username: { type: String },
  password: { type: String },
  /* isAdmin: { type: Boolean }, */
  firstname: { type: String },
  lastname: { type: String },
  phone: { type: String },
});

export const User = model("user", userSchema);
