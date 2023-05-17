import insertProdsMongo from "./create-prodsMongo.js";
import insertCartsMongo from "./create-cartsMongo.js";
import insertProdsSql from "./create-prodsSql.js";
import createProdTable from "./create-prodsSql.js";
import MongoClient from "../classes/MongoClient.class.js";
import insertUserMongo from "./create-usersMongo.js";
//import { mongoConnect } from "../config/mongoConfig.js";
import Config from "../config/config.js";

export default async function dataInit() {
  try {
    //Create the new table on the database
    switch (Config.tipo_persistencia) {
      case "MONGO":
        //MongoDB
        const db = new MongoClient();
        await db.connect();
        await insertUserMongo();
        await insertProdsMongo();
        await insertCartsMongo();
        await db.disconnect();
        break;
      case "MySQL":
        //MySQL
        await createProdTable("products");
        await insertProdsSql();
        break;
    }
  } catch (err) {
    //console.error(err)
    throw new Error(`Error while creating tables and connection to DB ${err}`);
  }
}
