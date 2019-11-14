require('dotenv').config({ silent: true })
require('./config')
const path = require('path')
const logger = require('./lib/logger')
const ais = require('./lib/ais')
const chalk = require('chalk')
const cors = require('cors')
const express = require('express')
const apiRouter = require('./routes/api-router')
const mongoose = require('mongoose')
const morgan = require('morgan')

// init mongoose default connection
// TODO: Let docker handle restarting app on db connection error
mongoose.Promise = global.Promise

mongoose.connect(process.env.DB_URI, {
  server: { reconnectTries: Number.MAX_VALUE }
})

mongoose.connection.on('connected', function () {
  console.log(chalk.green(`Mongoose default connection opened.`))
})

mongoose.connection.on('error', () => {
  mongoose.connection.close()
  mongoose.connection.open(`mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${DB_HOST}:${DB_PORT}`, {
    server: { reconnectTries: Number.MAX_VALUE }
  })
})

process.on('SIGINT', function () {
  mongoose.connection.close(function () {
    console.log(
      chalk.red(
        'Mongoose default connection disconnected through app termination'
      )
    )
    process.exit(0)
  })
})

// init ais Import Service
let importData = function () {
  ais
    .fetchAisData(process.env.AIS_DATA_URL)
    .then(aisData =>
      ais.repository
        .addAisPositions(aisData)
        .then(data =>
          logger.debug(
            `All new ais positions written to database. (${data.length})`
          )
        )
    )
    .catch(error => {
      logger.error(
        `Fetching ais data from ${process.env.AIS_DATA_URL} failed! ${error}`
      )
    })
}

// start ais Import Service
if (process.env.ENABLE_AIS_FETCHER === 'true') {
  setInterval(importData, process.env.AIS_DATA_FETCH_INTERVAL)
  console.log(chalk.green('Ais Import Service started.'))
}

// init express application
if (process.env.ENABLE_API) {
  let app = express()

  app.options('*', cors())
  app.use(cors())

  app.use(morgan('combined'))

  app.use('/api', apiRouter)

  app.use('/', express.static(path.join(__dirname, '/public')))

  app.listen(process.env.PORT, function () {
    console.log(
      chalk.green(`Web API Service started on port ${process.env.PORT}.`)
    )
  })
}
