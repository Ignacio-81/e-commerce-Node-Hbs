import { logger } from "../lib/index.js";

const invalidUrl = (req, res, next) => {
  const { url, method } = req;
  /*   logger.consoleLogger().info(`Method & route: ${method} ${url}`);
  next(); */
  logger
    .consoleLogger()
    .warn(`Method & route ${method} ${url} not implemented`);
  logger.warnLogger().warn(`Method & route ${method} ${url} not implemented`);
  res.status(404).send(`Method & route ${method} ${url} not implemented`);
};

export default invalidUrl;
