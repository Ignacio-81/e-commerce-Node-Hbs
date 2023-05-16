import pino from 'pino'

export const consoleLogger = () => {
    const logger = pino()
    logger.level = 'info'
    return logger
}

export const warnLogger = () => {
    const logger = pino('warn.log')
    logger.level = 'warn'

    return logger
}

export const errorLogger = () => {
    const logger = pino('error.log')
    logger.level = 'error'
    return logger
}
