import { products } from "../models/products.models.js";

const insertProdsMongo = async () => {
  try {
    await products.deleteMany(); //reset all the old products.
    //Add new products:
    await new products({
      name: "Keyboard",
      description: "English keyboard",
      category: "computer",
      price: 550,
      thumbnail:
        "https://images.unsplash.com/photo-1587829741301-dc798b83add3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=865&q=80",
      stock: 20,
      timestamp: Date(Date.now()).toString(),
    }).save();
    await new products({
      name: "Pencil",
      description: "Blac Pencil",
      category: "library",
      price: 150,
      thumbnail:
        "https://cdn.shopify.com/s/files/1/0147/3124/7680/products/matte-horizontal.jpg?v=1667496961",
      stock: 20,
      timestamp: Date(Date.now()).toString(),
    }).save();
    await new products({
      name: "Monitor",
      description: "Flat Monitor",
      category: "computer",
      price: 3500,
      thumbnail:
        "https://images.unsplash.com/photo-1586210579191-33b45e38fa2c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=435&q=80",
      stock: 20,
      timestamp: Date(Date.now()).toString(),
    }).save();
    await new products({
      name: "Spoon",
      description: "Soup Spoon",
      category: "home",
      price: 25,
      thumbnail:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWuOYHVQAIEdIL-1fQrhvPiXD5GlGSw2UWbQ&usqp=CAU",
      stock: 20,
      timestamp: Date(Date.now()).toString(),
    }).save();
    console.log("Products in MongDB inserted!");
  } catch (err) {
    throw new Error(`Error while creating Products in DataBase: ${err}`);
  }
};

export default insertProdsMongo;
