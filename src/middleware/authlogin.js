import { dirname, join } from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
/* 
MiddleWare to authorize loged user to main page, if not logged redirect to log in page
*/
export const userAuth = (req, res, next) => {
  if (req.user) {
    console.log("usuario logeado :" + req.user);
    next();
  } else {
    console.log("usuario No logeado");
    console.log(req.user);
    res.sendFile(join(__dirname, "../../views/login.html"));
    //res.redirect("/login");
  }
};
