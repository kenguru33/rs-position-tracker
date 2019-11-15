const AisPosition = require('./models/ais-position')
const logger = require('../../logger/index')

/**
 *
 * @param fromTime  - start date and time
 * @param toTime    - end date and time
 * @param mmsi      - which vessel to fetch data for. Optional, if not passed, all vessel are fetched
 * @returns {Promise.<Array>} - returns an array of points
 */
const getAisPosition = async (fromTime, toTime, mmsi) => {
  let aisPositions

  const t1 = fromTime
  const t2 = toTime

  try {
    if (mmsi) {
      aisPositions = await AisPosition.find({
        Time_stamp: { $gte: t1, $lte: t2 },
        MMSI: mmsi
      })
    } else {
      aisPositions = await AisPosition.find({
        Time_stamp: { $gte: t1, $lte: t2 }
      })
    }
  } catch (error) {
    logger.error(error)
    throw error
  }

  const pureObjects = []

  aisPositions.map(pos => {
    pureObjects.push(pos.toObject())
  })

  return pureObjects
}

module.exports = getAisPosition
