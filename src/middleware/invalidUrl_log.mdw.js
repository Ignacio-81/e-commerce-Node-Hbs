import { logger } from "../lib/index.js";

/* 
MiddleWare to check for valid url access, if not , log the error with method and url path 
 */
const invalidUrl = (req, res, next) => {
  const { url, method } = req;
  logger
    .consoleLogger()
    .warn(`Method & route ${method} ${url} not implemented`);
  logger.warnLogger().warn(`Method & route ${method} ${url} not implemented`);
  res.status(404).send(`Method & route ${method} ${url} not implemented`);
};

export default invalidUrl;
