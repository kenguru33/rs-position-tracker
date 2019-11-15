const AisPosition = require('./models/ais-position')
const moment = require('moment')
const logger = require('../../logger')

/**
 *
 * @param time
 * @param mmsi
 * @returns {Promise.<*>}
 */
const getAisPosition = async (time, mmsi) => {
  const timeWindowMinutes = process.env.MAX_TIME_WINDOW_IN_MINUTES || 20

  const unixTime = moment.utc(time).unix()

  const t1 = moment
    .utc(time)
    .subtract(timeWindowMinutes / 2, 'minutes')
    .format('YYYY-MM-DDTHH:mm:ss')
  const t2 = moment
    .utc(time)
    .add(timeWindowMinutes / 2, 'minutes')
    .format('YYYY-MM-DDTHH:mm:ss')

  try {
    const positions = await AisPosition.find({
      Time_stamp: { $gte: t1, $lte: t2 },
      MMSI: mmsi
    })

    let nearestPos = null
    let smallestTimeDiff = timeWindowMinutes * 1000 / 2

    positions.map(position => {
      const diff = Math.abs(unixTime - moment.utc(position.Time_stamp).unix())

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
