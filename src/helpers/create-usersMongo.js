import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";

const hashPasword = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

const insertUserMongo = async () => {
  try {
    await User.deleteMany();
    await new User({
      username: "admin@mail.com",
      password: hashPasword("admin"),
      firstname: "User",
      lastname: "Admin",
      phone: "11111111",
    }).save();
    await new User({
      username: "user@mail.com",
      password: hashPasword("1234"),
      firstname: "User",
      lastname: "User",
      phone: "11111111",
    }).save();
    console.log("User Created!");
  } catch (err) {
    throw new Error(`Error while creating Users in DataBase: ${err}`);
  }
};

export default insertUserMongo;
