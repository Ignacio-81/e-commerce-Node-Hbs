import bcrypt from "bcrypt";
import LocalStrategy from "passport-local";
import { User } from "../data/models/user.model.js";

const hashPasword = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

const validatePassword = (plainPassword, hashedPassword) => {
  return bcrypt.compareSync(plainPassword, hashedPassword);
};

const loginStrategy = new LocalStrategy(async (username, password, done) => {
  try {
    const user = await User.findOne({ username });
    if (!user || !validatePassword(password, user.password)) {
      //return done("Invalid credentials", null);
      return done(null, false, { message: "Invelid Credentials" });
    }

    return done(null, user);
  } catch (err) {
    return done(err);
  }
});

const registerStrategy = new LocalStrategy(
  { passReqToCallback: true },
  async (req, username, password, done) => {
    try {
      const existingUser = await User.findOne({ username });

      if (existingUser) {
        return done(null, false, { message: "Username Already in use" });
      }

      const newUser = {
        username,
        password: hashPasword(password),
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        age: req.body.age,
        phone: req.body.phone,
        address: req.body.address,
      };
      const createdUser = await User.create(newUser);
      //const createdUser = await User(data).save()
      req.user = createdUser;
      return done(null, createdUser);
    } catch (err) {
      return done("Error while register", null);
    }
  }
);

export const passportStrategies = { loginStrategy, registerStrategy };
