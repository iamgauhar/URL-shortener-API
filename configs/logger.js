import { createLogger, transports, format } from "winston";

const logger = createLogger({
    level: "info",
    format: format.combine(
        format.colorize({ all: true }),
        format.timestamp({ format: 'DD-MM-YYYY HH:mm:ss' }),
        format.align(),
        format.printf((info) => {
            const { timestamp, level, message, ...args } = info;

            return `${timestamp} [${level}]: ${message} ${Object.keys(args).length ? JSON.stringify(args, null, 2) : ''
                }`;
        })
    ),
    transports: new transports.Console(),
    // transport: new winston.transports.File({ filename: 'combined.log' });

})

export default logger;