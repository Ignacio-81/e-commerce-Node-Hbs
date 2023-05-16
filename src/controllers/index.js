import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { mailService } from "../services/mailsService.js";
import { smsService } from "../services/smsService.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getIndexPage = (req, res) => {
  // Esta ruta carga nuestro archivo index.html en la raíz de la misma
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
      usuario: user.username,
      nombre: user.firstname,
      apellido: user.lastname,
    });
  }

  res.sendFile(join(__dirname, "../../views/login.html"));
};
const getLoginStatus = (req, res) => {
  if (req.user) {
    console.log("login true");
    console.log(req.user.username);
    res.json({ login: "true", user: req.user });
  } else {
    console.log("false");
    res.json({ login: "false", user: "No user" });
  }
};

async function postRegister(req, res) {
  if (req.isAuthenticated()) {
    const user = req.user;
    await mailService.sendMailRegister();
    return res.render("register-ok", {
      usuario: user.username,
      nombre: user.firstname,
      apellido: user.lastname,
    });
  }
  res.sendFile(join(__dirname, "../../views/register.html"));
}

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

const postUserPhoto = (req, res, next) => {
  const file = req.file;

  if (!file) {
    const error = { message: "No subiste nada", statusCode: 400 };
    res.status(400).json(error);
  }

  res.status(201).json(file);
};

export const Controller = {
  getIndexPage,
  postLogin,
  logout,
  getLogin,
  getLoginStatus,
  postRegister,
  getLoginFailiure,
  getRegisterFailiure,
  postUserPhoto,
};
