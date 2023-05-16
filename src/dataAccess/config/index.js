import insertProds from "../../data/DBCreate-prods.js";
import insertCarts from "../../data/DBCreate-carts.js";
import { mongoConnect } from "./mongoConfig.js";

export async function dbInit() {
  try {
    await mongoConnect();
    await insertProds();
    await insertCarts();
    console.log(
      "Mongo DB Connection OK, products and carts added successfully"
    );
  } catch (err) {
    //console.error(err)
    throw new Error(`Error while connecting to Mongo DB ${err}`);
  }
}
