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

const swaggerJsDoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'RS Position Tracker', // Title (required)
      version: '1.0.0' // Version (required)
    }
  },
  // Path to the API docs
  apis: ['src/routes/api-router.js']
}

// Initialize swagger-jsdoc -> returns validated swagger spec in json format
const swaggerSpec = swaggerJsDoc(options)
console.log(swaggerSpec)
// init mongoose default connection
mongoose.Promise = global.Promise

mongoose
  .connect(process.env.DB_URI)
  .then(conn => {
    console.log(chalk.green('Connection to database established.'))
  })
  .catch(err => {
    console.log(chalk.red(`Error: ${err.message}`))
    console.log(chalk.red('Shutting down...'))
    process.exit(1)
  })

// init ais Import Service
const importData = function () {
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
  const app = express()

  app.options('*', cors())
  app.use(cors())

  app.use(morgan('combined'))

  app.use('/api', apiRouter)

  // serve swagger
  app.get('/swagger.json', function (req, res) {
    res.setHeader('Content-Type', 'application/json')
    res.send(swaggerSpec)
  })
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

  app.use('/', express.static(path.join(__dirname, '/public')))

  app.listen(process.env.PORT, function () {
    console.log(
      chalk.green(`Web API Service started on port ${process.env.PORT}.`)
    )
  })
}
