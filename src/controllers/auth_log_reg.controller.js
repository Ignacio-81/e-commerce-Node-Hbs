import { dirname, join } from "path";
import { fileURLToPath } from "url";
/* 
User Register and Log in Management Controller
*/

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getIndexPage = (req, res) => {
  console.log("get indexpage :" + req.user);
  res.sendFile(join(__dirname, "../public/index.html"));
};
const getLogin = (req, res) => {
  res.sendFile(join(__dirname, "../../views/login.html"));
};
const postLogin = (req, res) => {
  if (req.isAuthenticated()) {
    const user = req.user;
    return res.render("login-ok", {
      usuario: user.usermail,
      nombre: user.firstname,
      apellido: user.lastname,
    });
  }

  res.sendFile(join(__dirname, "../../views/login.html"));
};
const getLoginStatus = (req, res) => {
  if (req.user) {
    console.log("login true");
    res.json({ login: "true", user: req.user });
  } else {
    console.log("false");
    res.json({ login: "false", user: "No user" });
  }
};

const postRegister = (req, res) => {
  if (req.isAuthenticated()) {
    const user = req.user;
    return res.render("register-ok", {
      usuario: user.usermail,
      nombre: user.firstname,
      apellido: user.lastname,
    });
  }
  res.sendFile(join(__dirname, "../../views/register.html"));
};

const logout = (req, res) => {
  console.log("logout");
  req.logout(() => {
    console.log("logout complete");
    return res.redirect("/login");
  });
};

const getLoginFailiure = (req, res) => {
  res.render("login-error");
};

const getRegisterFailiure = (req, res) => {
  res.render("signup-error");
};

export const auth_Log_Reg_Controller = {
  getIndexPage,
  postLogin,
  logout,
  getLogin,
  getLoginStatus,
  postRegister,
  getLoginFailiure,
  getRegisterFailiure,
};
