/*
    winstone logger setting.
*/
const config = require('./getCfg').logConfig;
const path = require('path');
const winston = require('winston');
require('winston-daily-rotate-file');
require('date-utils');

const DEBUG_LEVEL = config.winston_log_level;
const ROOT_LOG_PATH = config.winston_log_path;
const SERVER_LOG_FNAME = config.winston_log_file;
const LOG_FORMAT = `YYYY-MM-DD HH24:MI:SS`;

const logger = winston.createLogger({
    level: DEBUG_LEVEL, // debugging level
    transports: [
        new winston.transports.DailyRotateFile({
            filename: path.join(ROOT_LOG_PATH, SERVER_LOG_FNAME), // log dir, file name 설정
            zippedArchive: true, // 압축여부
            format: winston.format.printf((info) => `${new Date().toFormat(LOG_FORMAT)} [${info.level.toUpperCase()}] - ${info.message}`),
        }),
        // 콘솔 출력
        new winston.transports.Console({
            format: winston.format.printf((info) => `${new Date().toFormat(LOG_FORMAT)} [${info.level.toUpperCase()}] - ${info.message}`),
        }),
    ],
});

module.exports = logger;
