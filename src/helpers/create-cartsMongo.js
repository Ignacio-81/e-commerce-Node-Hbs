import { carts } from "../models//carts.models.js";

const insertCartsMongo = async () => {
  try {
    await carts.deleteMany(); //reset all the old products.
    //Add new products:
    await new carts({
      username: "user@mail.com",
      products: [
        {
          name: "Keyboard",
          description: "English keyboard",
          category: "Computer",
          price: 550,
          thumbnail:
            "https://images.unsplash.com/photo-1587829741301-dc798b83add3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=865&q=80",
          stock: 20,
          qty: 1,
          timestamp: "13/12/2022, 18:31:39",
        },
        {
          name: "Pc mouse",
          description: "Mouse for desktop PC",
          category: "Computer",
          price: 150,
          thumbnail:
            "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=465&q=80",
          stock: 20,
          qty: 3,
          timestamp: "13/12/2022, 18:31:39",
        },
      ],
      userAddress: "9 de julio 150",
      timestamp: "13/12/2022, 18:31:39",
    }).save();
    await new carts({
      username: "admin@mail.com",
      products: [
        {
          name: "Monitor",
          description: "Flat Monitor",
          code: "0001134",
          price: 3500,
          thumbnail:
            "https://images.unsplash.com/photo-1586210579191-33b45e38fa2c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=435&q=80",
          stock: 15,
          qty: 2,
          timestamp: "13/12/2022, 18:31:39",
        },
        {
          name: "Auto ",
          description: "Cool car",
          code: "0001144",
          price: 1450,
          thumbnail:
            "https://img.freepik.com/psd-premium/imagen-tridimensional-coche_53876-1716.jpg?w=2000",
          stock: 20,
          qty: 4,
          timestamp: "13/12/2022, 18:31:39",
        },
      ],
      userAddress: "Rivadavia 144",
      timestamp: "13/12/2022, 18:31:39",
    }).save();
    console.log("Carts inserted in MongoDB");
  } catch (err) {
    throw new Error(`Error while creating Products in DataBase: ${err}`);
  }
};
export default insertCartsMongo;
