import pino from "pino";

const consoleLogger = () => {
  const logger = pino();
  logger.level = "info";
  return logger;
};

const warnLogger = () => {
  const logger = pino("warn.log");
  logger.level = "warn";

  return logger;
};

const errorLogger = () => {
  const logger = pino("error.log");
  logger.level = "error";
  return logger;
};

export const logger = {
  consoleLogger,
  warnLogger,
  errorLogger,
};
