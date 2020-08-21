/*
    access logger setting with morgan
*/
const config = require('./getCfg').logConfig;
const rfs = require('rotating-file-stream');
const moment = require('moment-timezone');
const morgan = require('morgan');
const path = require('path');

//const LOG_ACC_PATH = __dirname;
const LOG_ACC_PATH = config.access_log_path;
const LOG_ACC_FILE = config.access_log_file;
const LOG_ACC_NAME = `accesLogFormat`;
const LOG_ACC_FORMAT = `[:date[Asia/Seoul]] [:method] [:status] [:url] :res[content-length] - :response-time ms`;

// set date timezone
morgan.token('date', (req, res, tz) => {
    return moment().tz(tz).format();
});

// set morgan format
morgan.format(LOG_ACC_NAME, LOG_ACC_FORMAT);

// create a rotating write stream
const accessLogStream = rfs.createStream(`${LOG_ACC_FILE}`, {
    interval: '1d', // rotate daily
    path: path.join(`${LOG_ACC_PATH}`, `access`),
});

// log skip 조건, error code만 log
const skipAcceLogByStatusCode = (req, res) => {
    return res.statusCode < 400;
};

const setAccessLogger = (app) => {
    if (app.get('env') == 'production') {
        app.use(
            morgan(LOG_ACC_NAME, {
                skip: skipAcceLogByStatusCode,
                stream: accessLogStream,
            })
        );
    } else {
        app.use(morgan(LOG_ACC_NAME, { stream: accessLogStream }));
    }
};

module.exports.setAccessLogger = setAccessLogger;
//module.exports.accessLogStream = accessLogStream;
//module.exports.morgan = morgan;
//module.exports.accLog = LOG_ACC_NAME;
//module.exports.skipAcceLogByStatusCode = skipAcceLogByStatusCode;

//const morgan = require('morgan');
//const path = require('path');
//const rfs = require('rotating-file-stream');
//const moment = require('moment-timezone');

/*
const LOG_FILE_NAME = `access.log`;
// winstone 추가.
// create a rotating write stream
const accessLogStream = rfs.createStream(`${LOG_FILE_NAME}`, {
    interval: '1d', // rotate daily
    path: path.join(__dirname, 'log'),
});
// set date timezone
morgan.token('date', (req, res, tz) => {
    return moment().tz(tz).format();
});
// set morgan format
morgan.format('accesLogFormat', `[:date[Asia/Seoul]] [:method] [:status] [:url] :res[content-length] - :response-time ms`);
*/
