import config from "../config/sqlConfig.js";
import knex from "knex";
const database = knex(config);

const insertProdsSql = async () => {
  try {
    const prods = [
      {
        title: "Keyboard",
        price: 550,
        thumbnail:
          "https://images.unsplash.com/photo-1587829741301-dc798b83add3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=865&q=80",
      },
      {
        title: "Pc mouse",
        price: 150.0,
        thumbnail:
          "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=465&q=80",
      },
      {
        title: "Monitor",
        price: 350.0,
        thumbnail:
          "https://images.unsplash.com/photo-1586210579191-33b45e38fa2c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=435&q=80",
      },
      {
        title: "Auto ",
        price: 145.0,
        thumbnail:
          "https://img.freepik.com/psd-premium/imagen-tridimensional-coche_53876-1716.jpg?w=2000",
      },
    ];
    await database("products").insert(prods);

    console.log("Products in MySQL inserted!");

    //database.destroy();
  } catch (err) {
    database.destroy();
    throw new Error(`Error while creating Products in DataBase: ${err}`);
  }
};

export default insertProdsSql;
//insertProds();
