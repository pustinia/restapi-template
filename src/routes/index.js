const express = require('express');
const router = express.Router();
const logger = require('../system/logger');
const oracleConn = require('../databases/oracleConn');

/* GET home page. */
router.get('/', (req, res, next) => {
    //res.render('index', { title: 'Express' });
    logger.info(`asdfasdfasdf`);
    res.send('hello world');
});

module.exports = router;
