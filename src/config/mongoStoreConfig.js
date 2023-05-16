import MongoStore from "connect-mongo";
import config from "./config.js";

const mongoOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

/* export async function mongoConnect() {
  try {
    const URL = config.MONGO_URL;
    let res = await mongoose.connect(URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected");
  } catch (e) {
    throw new Error(`Error while connecting to Mongo DB ${e}`);
  }
} */

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
