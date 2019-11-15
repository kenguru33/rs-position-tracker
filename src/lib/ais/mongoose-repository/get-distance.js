const distance = require('gps-distance')

/**
 * returns the distance of an array of positions.
 * @param jsonAisPositions
 * @returns {number} (distance in km)
 */
const getDistance = function (jsonAisPositions) {
  const locations = []

  jsonAisPositions.map(aisPosition => {
    locations.push([
      aisPosition.Decimal_Latitude,
      aisPosition.Decimal_Longitude
    ])
  })

  return distance(locations)
}

module.exports = getDistance
