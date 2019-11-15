const ais = require('../lib/ais')
const logger = require('../lib/logger')
const moment = require('moment')

const isMMSIValid = function (mmsi) {
  return /^[0-9]{9}$/.test(mmsi)
}

const isValiDTimeSpan = function (fromTime, toTime) {
  return moment(fromTime).isBefore(toTime)
}

const isValidGpsCoords = function (lat, lng) {
  return lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180
}

module.exports = {
  getPositions (req, res) {
    if (!isValiDTimeSpan(req.params.fromTime, req.params.toTime)) {
      res.status(400).send({ error: 'from time is later than to time' })
      return
    }

    if (!isMMSIValid(req.params.mmsi)) {
      res.status(400).send({ error: 'not an valid mmsi' })
      return
    }

    if (req.params.mmsi === '*') {
      req.params.mmsi = null
    }
    ais.repository
      .getAisPositions(req.params.fromTime, req.params.toTime, req.params.mmsi)
      .then(aisData => {
        res.send(aisData)
      })
      .catch(error => {
        logger.error(error.stack)
        res.send(JSON.stringify(error.message))
      })
  },

  getDistance (req, res) {
    if (!isValiDTimeSpan(req.params.fromTime, req.params.toTime)) {
      res.status(400).send({ error: 'from time is later than to time' })
      return
    }

    if (!isMMSIValid(req.params.mmsi)) {
      res.status(400).send({ error: 'not an valid mmsi' })
      return
    }

    ais.repository
      .getAisPositions(req.params.fromTime, req.params.toTime, req.params.mmsi)
      .then(aisData => {
        const distance = ais.repository.getDistance(aisData)

        res.send({
          MMSI: req.params.mmsi,
          FromZuluTime: req.params.fromTime,
          ToZuluTime: req.params.toTime,
          PositionCount: aisData.length,
          Distance_nm: distance * 0.539956803,
          Distance_km: distance
        })
      })
      .catch(error => {
        logger.error(error.stack)
        res.send(JSON.stringify(error.message))
      })
  },

  // Time To Go
  getTTG (req, res) {
    if (!isValidGpsCoords(req.params.latitude, req.params.longitude)) {
      res.status(400).send({ error: 'gps coords not valid' })
      return
    }

    if (!isMMSIValid(req.params.mmsi)) {
      res.status(400).send({ error: 'not an valid mmsi' })
      return
    }

    ais.repository
      .getAisTTG(req.params.mmsi, req.params.latitude, req.params.longitude)
      .then(timeToGo => {
        res.send(timeToGo)
      })
      .catch(error => {
        console.log(error)
        res.send(JSON.stringify(error.message))
      })
  },

  // Estimated Time of Arrival
  getETA (req, res) {
    res.status(501).send('Time On Arrival not implemented')
  },

  getLastPosition (req, res) {
    if (!isMMSIValid(req.params.mmsi)) {
      res.status(400).send({ error: 'not an valid mmsi' })
      return
    }
    ais.repository
      .getLastPosition(req.params.mmsi)
      .then(aisPosition => {
        res.send(aisPosition)
      })
      .catch(error => res.send(error))
  },

  // Search for nearest position within a max time span for a specified time.
  getPosition (req, res) {
    if (!isValiDTimeSpan(req.params.time, moment.utc())) {
      res.status(422).send({ error: 'date set in the future' })
      return
    }

    if (!isMMSIValid(req.params.mmsi)) {
      res.status(400).send({ error: 'not an valid mmsi' })
      return
    }

    ais.repository
      .getAisPosition(req.params.time, req.params.mmsi)
      .then(aisPosition => {
        if (!aisPosition) {
          res.status(404).send({ error: 'No position found' })
        }
        res.send(aisPosition)
      })
      .catch(error => {
        res.send(JSON.stringify(error.message))
      })
  }
}
