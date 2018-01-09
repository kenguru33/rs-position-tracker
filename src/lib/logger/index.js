let winston = require('winston')

let logger = new winston.Logger({
  level: process.env.LOG_LEVEL || 'error',
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'app.log' })
  ]
})

module.exports = logger
