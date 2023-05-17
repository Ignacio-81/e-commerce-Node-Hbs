import bcrypt from "bcrypt";
import LocalStrategy from "passport-local";
import { User } from "../models/user.model.js";
import MongoClient from "../classes/MongoClient.class.js";
/* 
Passport Library Management 
*/
const db = new MongoClient();

const hashPasword = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

const validatePassword = (plainPassword, hashedPassword) => {
  return bcrypt.compareSync(plainPassword, hashedPassword);
};

const loginStrategy = new LocalStrategy(async (username, password, done) => {
  try {
    await db.connect();
    const user = await User.findOne({ username });
    if (!user || !validatePassword(password, user.password)) {
      return done(null, false, { message: "Invalid Credentials" });
    }

    return done(null, user);
  } catch (err) {
    return done(err);
  } finally {
    await db.disconnect();
  }
});

const registerStrategy = new LocalStrategy(
  { passReqToCallback: true },
  async (req, username, password, done) => {
    try {
      console.log("registerStrategy");
      await db.connect();
      const existingUser = await User.findOne({ username });
      //await db.disconnect();
      if (existingUser) {
        console.log("Error while register2");
        return done(null, false, { message: "Username Already in use" });
      }

      const newUser = {
        username,
        password: hashPasword(password),
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        phone: req.body.phone,
      };
      console.log(newUser);
      // await db.connect();
      const createdUser = await User.create(newUser);

      req.user = createdUser;
      return done(null, createdUser);
    } catch (err) {
      console.log("Error while register");
      return done("Error while register", null);
    } finally {
      await db.disconnect();
    }
  }
);

export const passportStrategies = { loginStrategy, registerStrategy };
