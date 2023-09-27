const winston = require('winston');
const colors = require('colors/safe');
const DailyRotateFile = require('winston-daily-rotate-file');

// Define log levels and their colors
const logLevels = {
    error: 'red',
    warn: 'yellow',
    info: 'green',
    verbose: 'cyan',
    debug: 'blue',
    request: 'red', // Custom log level for request logging
    response: 'yellow', // Custom log level for response logging
};

const colorizer = winston.format.colorize({ colors: logLevels });

// Configure the Winston logger
const logger = winston.createLogger({
    level: 'info', // Set the default log level
    format: winston.format.combine(
        winston.format.timestamp(),
        // colorizer,
        winston.format.colorize({ all: true }),
        winston.format.align(),
        winston.format.printf(({ timestamp, level, message }) => {
            const logColor = colors[logLevels[level]] || colors.white; // Default to white if color not found
            // const color=logColor._styles[0];
            console.log("--------------");
            console.log(message);
            return logColor(`${timestamp} [${level}]: ${message}`);
        })
    ),
    transports: [
        new winston.transports.Console({
            format: winston.format.combine(winston.format.colorize(), winston.format.simple()),
        }),
    //     new DailyRotateFile({
    //         level: 'info',
    //         filename: 'logs/application-%DATE%.log',
    //         datePattern: 'YYYY-MM-DD',
    //         zippedArchive: true,
    //         maxSize: '20m', // Maximum file size before rotation
    //         maxFiles: '14d', // Number of days to keep log files
    //     }),
    //     new winston.transports.File({
    //         filename: 'logs/console.log',
    //         level: 'info', // Set the log level for this transport
    //     }),
    ],
    levels: logLevels,
});

module.exports = logger;
