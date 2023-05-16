import express, { urlencoded, json } from "express";
import router from "./routes/index.js";
import { engine } from "express-handlebars";
import passport from "passport";
import invalidUrl from "./middleware/invalidUrl.middleware.js";
import { dirname } from "path";
import { fileURLToPath } from "url";
import { User } from "./data/models/user.model.js";
import MongoStore from "connect-mongo";
import session from "express-session";
import { passportStrategies } from "./lib/passport.lib.js";
import urlRegister from "./middleware/logger.mdw.js";
import { configObject } from "./dataAccess/config/mongoConfig.js";
import { dbInit } from "./dataAccess/config/index.js";
import { Server as IOServer } from "socket.io";
import { prodsService } from "./services/prodService.js";
import os from "os";
import cluster from "cluster";
import { mongoConnect } from "./dataAccess/config/mongoConfig.js";
import { errorLogger } from "./lib/logger.lib.js";

//************************************************************************* */
//**************************Global Configuration Constants*******************/
const PORT = 3000;
const MODE = "fork";
//************************************************************************* */
const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();

app.use(json());
app.use(urlencoded({ extended: false }));
app.use(express.static(__dirname + "/data/uploads"));
//Mongo DB set up
const mongoOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
app.use(
  session({
    secret: "coderhouse",
    resave: false,
    rolling: true,
    saveUninitialized: false,
    store: new MongoStore({
      mongoUrl: configObject.mongoUrl,
      mongoOptions,
    }),
    cookie: {
      expires: 60000, //session will expire without activity
    },
  })
);

app.engine(
  "hbs",
  engine({
    extname: ".hbs",
    defaultLayout: "main.hbs",
  })
);
app.set("view engine", ".hbs");
app.use("/static", express.static(__dirname + "/public"));

//passport configuration for authentification
app.use(passport.initialize());
app.use(passport.session());

passport.use("login", passportStrategies.loginStrategy);
passport.use("register", passportStrategies.registerStrategy);

if (MODE.toUpperCase() === "FORK") await dbInit();
//await dbInit();
const cpus = os.cpus(); //get all cpus cores on the server

if (cluster.isPrimary && MODE.toUpperCase() === "CLUSTER") {
  await dbInit();
  console.log(`
  CPUS: ${cpus.length}
  Primary PID: ${process.pid}
  `);
  cpus.map(() => {
    cluster.fork();
  });

  cluster.on("exit", (worker) => {
    console.log(`Worker ${worker.process.pid} died`);
  });
} else {
  if (MODE.toUpperCase() === "CLUSTER") await mongoConnect();
  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id)
      .then((data) => {
        done(null, data);
      })
      .catch((err) => {
        console.error(err);
      });
  });
  app.use("/", urlRegister, router);
  app.use(invalidUrl);

  const expressServer = app.listen(PORT, () =>
    console.log("Server listening on port : " + PORT + " Mode: " + MODE)
  );

  app.on("error", (err) => {
    console.log(err);
    errorLogger().error(`Error on the socket App: ${err}`);
  });

  const io = new IOServer(expressServer);

  io.on("connection", async (socket) => {
    try {
      console.log(`New client connection ${socket.id}`);

      // send product for new client
      socket.emit("server:products", await prodsService.getProducts());

      // listen products from clients
      socket.on("client:productData", async (productData) => {
        try {
          // update product DB
          productData.price = parseInt(productData.price);
          await prodsService.addProduct(productData);

          // send product to all clients
          io.emit("server:products", await prodsService.getProducts());
        } catch (err) {
          throw new Error(`Error listening socket clientData: ${err}`);
        }
      });
      /*     //send chat message for new user
    socket.emit("server:message", await dbChats.getAll());

    // listen new message from chat
    socket.on("client:message", async (messageInfo) => {
      try {
        // update message array
        await dbChats.save(messageInfo);
        // send message to all users
        io.emit("server:message", await dbChats.getAll());
      } catch (err) {
        console.log(err);
        errorLogger().error(`Error on the application: ${err}`);
      }
    }); */
    } catch (err) {
      console.log(err);
      errorLogger().error(`Error on the socket App: ${err}`);
    }
  });
}
