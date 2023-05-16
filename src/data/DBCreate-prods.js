import * as model from "./models/prod&cart.models.js";

const insertProds = async () => {
  try {
    await model.products.deleteMany(); //reset all the old products.
    //Add new products:
    await new model.products({
      name: "Keyboard",
      description: "English keyboard",
      code: "0000334",
      price: 550,
      thumbnail:
        "https://images.unsplash.com/photo-1587829741301-dc798b83add3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=865&q=80",
      stock: 20,
      timestamp: "13/12/2022, 18:31:39",
    }).save();
    await new model.products({
      name: "Pc mouse",
      description: "Mouse for desktop PC",
      code: "0000234",
      price: 150,
      thumbnail:
        "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=465&q=80",
      stock: 20,
      timestamp: "13/12/2022, 18:31:39",
    }).save();
    await new model.products({
      name: "Monitor",
      description: "Flat Monitor",
      code: "0001134",
      price: 3500,
      thumbnail:
        "https://images.unsplash.com/photo-1586210579191-33b45e38fa2c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=435&q=80",
      stock: 20,
      timestamp: "13/12/2022, 18:31:39",
    }).save();
    console.log("Products inserted!");
  } catch (err) {
    throw new Error(`Error while creating Products in DataBase: ${err}`);
  }
};

export default insertProds;
