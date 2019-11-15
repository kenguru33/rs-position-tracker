const AisPosition = require('./models/ais-position')
const logger = require('../../logger/index')

/**
 * Removes all positions in input array from database.
 * @param jsonAisDataArray
 * @returns {Promise.<*>}
 */
const removeAisPositions = function (jsonAisDataArray) {
  const removeOperations = jsonAisDataArray.map(jsonAisPosition => {
    return (
      new AisPosition(jsonAisPosition)
        .remove()
        .then(aisData =>
          logger.info(
            'REMOVE',
            `MMSI:${aisData.MMSI} Time_stamp:${aisData.Time_stamp}`
          )
        )
        // put a catch block here to prevent promise.all to fail on error.
        .catch(error => logger.error('REMOVE', error))
    )
  })

  return Promise.all(removeOperations)
}

module.exports = removeAisPositions
