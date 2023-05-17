import MongoStore from "connect-mongo";
import config from "./config.js";
/* 
Mongo Store configuration. Mongo Session Management configuration
*/
const mongoOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

export const mongoSession = {
  secret: "coderhouse",
  resave: false,
  rolling: true,
  saveUninitialized: false,
  store: new MongoStore({
    mongoUrl: config.mongoDb,
    mongoOptions,
  }),
  cookie: {
    expires: config.session_time, //session will expire without activity
  },
};
