const moment = require('moment')
const getLastPosition = require('./get-last-position')
const getDistance = require('./get-distance')

/**
 * Calculates Time To Go to a target position and returns json object { TTG: <value in minutes>, SOG: <value in knots> }
 * @param mmsi
 * @param latitude
 * @param longitude
 * @returns {Promise}
 */
const getAisTTG = (mmsi, latitude, longitude) => {
  const targetAisPosition = {
    Decimal_Latitude: latitude,
    Decimal_Longitude: longitude
  }

  return new Promise((resolve, reject) => {
    getLastPosition(mmsi)
      .then(lastPos => {
        const speed = lastPos.SOG * 1.852 // km/h
        const distanceFromLastPos = getDistance([lastPos, targetAisPosition])
        const timeLastPos = moment(lastPos.Time_stamp)
          .utc()
          .unix()
        const timeNow = moment().unix()
        const timeCorrectionSeconds = timeNow - timeLastPos
        const distanceCorrection = speed * (timeCorrectionSeconds / 3600)
        const timeToTarget =
          60 * (distanceFromLastPos - distanceCorrection) / speed
        const timeAtArrival = moment()
          .utc()
          .add(timeToTarget, 'minutes')

        resolve({
          TTG: timeToTarget,
          ETA: moment(timeAtArrival),
          SOG: speed * 0.5399568034557235,
          LastPosition_TimeStamp: lastPos.Time_stamp
        })
      })
      .catch(error => {
        reject(error)
      })
  })
}

module.exports = getAisTTG
