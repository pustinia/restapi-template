// express 설정
const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');
const createError = require('http-errors');

// logger 설정.
const accessLogger = require('./system/accessLogger');

// router 설정.
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

// express app 설정
const app = express();
accessLogger.setAccessLogger(app);

// set middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
    next(createError.NotFound()); // 다음 미들웨어 호출
});

// error handler
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    const errorObject = {
        // make custom error object
        code: err.status,
        message: err.message,
    };
    res.json(errorObject);
});

module.exports = app;

// production or development
// app.use(logger.morgan(logger.accLog, { stream: logger.accessLogStream }));
/*
if (app.get('env') == 'production') {
    app.use(
        logger.morgan(logger.accLog, {
            skip: accessLogger.skipAcceLogByStatusCode,
            stream: accessLogger.accessLogStream,
        })
    );
} else {
    app.use(logger.morgan(accessLogger.accLog, { stream: accessLogger.accessLogStream }));
}*/
