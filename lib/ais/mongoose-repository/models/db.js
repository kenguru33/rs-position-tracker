let mongoose = require('mongoose');
let logger = require("./../../../logger/index");

mongoose.Promise = global.Promise;

let connection = mongoose.createConnection(process.env.DB_URI, { server: { reconnectTries: Number.MAX_VALUE } });

connection.on('error', error => {
    logger.error('Database Connection: ' + error.message);
    // ugly hack to make possible to resume after initial connection failure.
    connection.db.close();
    connection.open(process.env.DB_URI, { server: { reconnectTries: Number.MAX_VALUE } });
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