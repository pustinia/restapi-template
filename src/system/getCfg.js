/*
    get config settings
*/
const configJson = require('../config/config.json')[process.env.NODE_ENV || 'development'];
// import { configJson } from '../config/config.json';

// set sub configs

// database config
const dbConfig = configJson.databases;

// log config
const logConfig = configJson.log;

module.exports.dbConfig = dbConfig;
module.exports.logConfig = logConfig;
