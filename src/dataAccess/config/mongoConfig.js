import mongoose from "mongoose";
import { config } from "dotenv";
config();

export const configObject = {
  mongoUrl: process.env.MONGO_URL,
};
export async function mongoConnect() {
  try {
    const URL = configObject.mongoUrl;
    let res = await mongoose.connect(URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected");
  } catch (e) {
    throw new Error(`Error while connecting to Mongo DB ${e}`);
  }
}
