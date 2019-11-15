const fetch = require('node-fetch')

/**
 * Fetch ais position data from url
 * @param url
 * @returns {Promise}
 */
const fetchAisData = function (url) {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'

  return new Promise((resolve, reject) => {
    fetch(url)
      .then(res => {
        resolve(res.json())
      })
      .catch(error => {
        reject(error)
      })
  })
}

module.exports = fetchAisData
