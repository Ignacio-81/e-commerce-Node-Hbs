import { logger } from "../lib/index.js";
/* 
MiddleWare to validate and log User registration
*/
const urlRegister = (req, res, next) => {
  const { url, method } = req;
  console.log("Logger" + req.user);
  logger.consoleLogger().info(`Method & route: ${method} ${url}`);
  next();
};

export default urlRegister;
