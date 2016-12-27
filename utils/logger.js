let winston = require('winston');
let config = require('./../config');

let logger = new winston.Logger ({
    level: config.loglevel,
    transports: [
        new (winston.transports.Console)(),
        new (winston.transports.File)({ filename: 'app.log' })
    ]
});

module.exports = logger;