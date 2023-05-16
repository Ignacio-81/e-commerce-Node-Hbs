import { logger } from "../lib/index.js";

const urlRegister = (req, res, next) => {
  const { url, method } = req;
  console.log("Logger" + req.user);
  logger.consoleLogger().info(`Method & route: ${method} ${url}`);
  next();
};

export default urlRegister;
