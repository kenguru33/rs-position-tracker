let mongoose = require('mongoose');
let config = require('../config');
let logger = require("./../lib/logger/index");

mongoose.Promise = global.Promise;

let connection = mongoose.createConnection(config.dbURI, { server: { reconnectTries: Number.MAX_VALUE } });

connection.on('error', error => {
    logger.error('Database Connection: ' + error.message);
    // ugly hack to make possible to resume after initial connection failure.
    connection.db.close();
    connection.open(config.dbURI, { server: { reconnectTries: Number.MAX_VALUE } });
});

connection.once('connected', () => {
    logger.info('Connection to database established.');
});

connection.on('disconnected', () => {
    logger.info('Disconnected from database.');
});

connection.on('reconnected', () => {
    logger.info('Reconnected to database.');
});

connection.once('open', () => {
   //logger.info('Connection opened');
});

module.exports = connection;