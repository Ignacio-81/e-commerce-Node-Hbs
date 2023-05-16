import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { consoleLogger } from "../lib/logger.lib.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const userAuth = (req, res, next) => {
  if (req.user) {
    //console.log("usuario logeado :" + req.user)
    consoleLogger().info(`user logged : ${req.user}`);
    next();
  } else {
    //console.log("usuario No logeado")
    consoleLogger().info("User not logged in ..");
    console.log(req.user);
    res.sendFile(join(__dirname, "../../views/login.html"));
    //res.redirect("/login");
  }
};
