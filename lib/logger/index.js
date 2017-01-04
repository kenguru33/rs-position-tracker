let winston = require('winston');

let logger = new winston.Logger ({
    level: process.env.AIS_DATA_FETCH_INTERVAL || 'error',
    transports: [
        new (winston.transports.Console)(),
        new (winston.transports.File)({ filename: 'app.log' })
    ]
});

module.exports = logger;