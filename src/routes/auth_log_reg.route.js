import { auth_Log_Reg_Controller } from "../controllers/index.js";
import { Router } from "express";
import passport from "passport";
import { userAuth } from "../middleware/authlogin.js";
/*  
Log in , Register and User Validation and authorization Router
*/
const router = Router();

router.get("/", userAuth, auth_Log_Reg_Controller.getIndexPage);
router.post(
  "/login",
  passport.authenticate("login", { failureRedirect: "/fail-login" }),
  auth_Log_Reg_Controller.postLogin
);
router.get("/loginstatus", auth_Log_Reg_Controller.getLoginStatus);
router.get("/login", auth_Log_Reg_Controller.getLogin);

router.get("/logout", userAuth, auth_Log_Reg_Controller.logout);

router.get("/register", auth_Log_Reg_Controller.postRegister);
router.post(
  "/register",
  passport.authenticate("register", { failureRedirect: "/fail-register" }),
  auth_Log_Reg_Controller.postRegister
);

router.get("/fail-login", auth_Log_Reg_Controller.getLoginFailiure);
router.get("/fail-register", auth_Log_Reg_Controller.getRegisterFailiure);

export default router;
