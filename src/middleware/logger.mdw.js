import { consoleLogger } from "../lib/logger.lib.js";

const urlRegister = (req, res, next) => {
  const { url, method } = req;
  consoleLogger().info(`Method & route: ${method} ${url}`);
  next();
  //res.status(404).send(`Method & route ${method} ${url} not implemented`);
};

export default urlRegister;
