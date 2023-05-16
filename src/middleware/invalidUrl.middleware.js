import { consoleLogger, warnLogger } from "../lib/logger.lib.js";

const invalidUrl = (req, res, next) => {
  const { url, method } = req;
  //consoleLogger().warn(`Method & route ${method} ${url} not implemented`)
  warnLogger().warn(`Method & route ${method} ${url} not implemented`);
  res.status(404).send(`Method & route ${method} ${url} not implemented`);
};

export default invalidUrl;
