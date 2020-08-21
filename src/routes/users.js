const express = require('express');
const router = express.Router();
const logger = require('../system/logger');

/* GET users listing. */
router.get('/', function (req, res, next) {
    logger.info('12345');
    res.send('respond with a resource');
});

module.exports = router;
