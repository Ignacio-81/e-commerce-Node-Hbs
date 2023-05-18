import insertProdsMongo from "./create-prodsMongo.js";
import insertCartsMongo from "./create-cartsMongo.js";
import insertProdsSql from "./create-prodsSql.js";
import createProdTable from "./create-prodsSql.js";
import MongoClient from "../classes/MongoClient.class.js";
import insertUserMongo from "./create-usersMongo.js";
import Config from "../config/config.js";
/* 
Data Initilization Manager for getting app ready to test, creating sets of data on Database
*/

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
        //MySQL - TO BE ADDED IN THE FUTURE
        /*        await createProdTable("products");
        await insertProdsSql(); */
        break;
    }
  } catch (err) {
    throw new Error(`Error while creating tables and connection to DB ${err}`);
  }
}
