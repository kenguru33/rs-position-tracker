let AisPosition = require('./models/ais-position')
let moment = require('moment')
let logger = require('../../logger')

/**
 *
 * @param time
 * @param mmsi
 * @returns {Promise.<*>}
 */
let getAisPosition = async (time, mmsi) => {
  let timeWindowMinutes = process.env.MAX_TIME_WINDOW_IN_MINUTES || 20

  let unixTime = moment.utc(time).unix()

  let t1 = moment
    .utc(time)
    .subtract(timeWindowMinutes / 2, 'minutes')
    .format('YYYY-MM-DDTHH:mm:ss')
  let t2 = moment
    .utc(time)
    .add(timeWindowMinutes / 2, 'minutes')
    .format('YYYY-MM-DDTHH:mm:ss')

  try {
    let positions = await AisPosition.find({
      Time_stamp: { $gte: t1, $lte: t2 },
      MMSI: mmsi
    })

    let nearestPos = null
    let smallestTimeDiff = timeWindowMinutes * 1000 / 2

    positions.map(position => {
      let diff = Math.abs(unixTime - moment.utc(position.Time_stamp).unix())

      if (diff < smallestTimeDiff) {
        smallestTimeDiff = diff
        nearestPos = position
      }
    })

    if (nearestPos) {
      return nearestPos.toObject()
    } else {
      return null
    }
  } catch (error) {
    logger.error(error)
  }
}

module.exports = getAisPosition
