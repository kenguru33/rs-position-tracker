const fetchAisData = require('../fetch-ais-data')

/**
 * get the last reported position for an given mmsi
 * @param mmsi
 * @returns {Promise}
 */
const getLastPosition = mmsi => {
  return new Promise((resolve, reject) => {
    fetchAisData(process.env.AIS_DATA_URL)
      .then(aisData => {
        const pos = aisData.find(aisPosition => aisPosition.MMSI === mmsi)
        resolve(pos)
      })
      .catch(error => {
        reject(error)
      })
  })
}

module.exports = getLastPosition
