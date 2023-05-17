import express, { urlencoded, json } from "express";
import { engine } from "express-handlebars";
import passport from "passport";
import { dirname } from "path";
import { fileURLToPath } from "url";
import session from "express-session";
import { Server as IOServer } from "socket.io";
import os from "os";
import cluster from "cluster";
import yargs from "yargs";

import router from "./routes/index.js";
import config from "./config/config.js";
import invalidUrl from "./middleware/invalidUrl_log.mdw.js";
import { User } from "./models/user.model.js";
import { passportStrategies } from "./lib/passport.lib.js";
import urlRegister from "./middleware/logger.mdw.js";
import dataInit from "./helpers/index.js";
import { logger } from "./lib/index.js";
import { mongoSession } from "./config/mongoStoreConfig.js";
import MongoClient from "./classes/MongoClient.class.js";
import { chatService } from "./services/index.js";

const db = new MongoClient();

//************************************************************************* */
export const args = yargs(process.argv.slice(2))
  .alias({
    p: "port",
    m: "mode",
  })
  .default({
    port: config.port,
    mode: "fork",
  }).argv;
//************************************************************************* */

const app = express();

app.use(json());
app.use(urlencoded({ extended: false }));
const __dirname = dirname(fileURLToPath(import.meta.url));
app.use("/static", express.static(__dirname + "/public"));
app.use(session(mongoSession));

app.engine(
  "hbs",
  engine({
    extname: ".hbs",
    defaultLayout: "main.hbs",
  })
);
app.set("view engine", ".hbs");

//passport configuration for authentification
app.use(passport.initialize());
app.use(passport.session());

passport.use("login", passportStrategies.loginStrategy);
passport.use("register", passportStrategies.registerStrategy);

if (args.mode.toUpperCase() === "FORK") await dataInit();
const cpus = os.cpus(); //get all cpus cores on the server

if (cluster.isPrimary && args.mode.toUpperCase() === "CLUSTER") {
  await dataInit();
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
  //if (args.mode.toUpperCase() === "CLUSTER") await db.connect();

  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser(async (id, done) => {
    await db.connect();
    User.findById(id)
      .then((data) => {
        done(null, data);
      })
      .catch((err) => {
        console.error(err);
      });
  });
  app.use(urlRegister);
  app.use(router);
  app.use(invalidUrl);

  const expressServer = app.listen(args.port, () =>
    console.log(
      "Server listening on port : " + args.port + " Mode: " + args.mode
    )
  );

  app.on("error", (err) => {
    console.log(err);
    logger().error(`Error on the socket App: ${err}`);
  });

  const io = new IOServer(expressServer);

  io.on("connection", async (socket) => {
    try {
      console.log(`New client connection ${socket.id}`);
      //send chat message for new user
      //socket.emit("server:message", { _id: "new" });
      socket.emit("server:message", await chatService.findAllChats());
      // listen new message from chat
      socket.on("client:message", async (messageInfo) => {
        try {
          //if (messageInfo.msgtype != "loadpage") {
          await chatService.saveMsg(messageInfo.username, {
            msgtype: messageInfo.msgtype,
            message: messageInfo.message,
          });
          //}
          // send message to all users
          io.emit(
            "server:message",
            //await chatService.findAllChatsByUser(messageInfo.username)
            await chatService.findAllChats()
          );
        } catch (err) {
          console.log(err);
          logger.errorLogger().error(`Error on the application: ${err}`);
        }
      });
    } catch (err) {
      console.log(err);
      logger.errorLogger().error(`Error on the socket App: ${err}`);
    }
  });
}
