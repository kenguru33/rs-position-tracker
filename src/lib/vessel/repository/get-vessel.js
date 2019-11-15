// const xml2js = require('xml2js');
const parser = require('xml2json')
const fetch = require('node-fetch')

const options = {
  object: true,
  reversible: false,
  coerce: false,
  sanitize: true,
  trim: true,
  arrayNotation: false
}

// Fixme: Should be getting data from MDS.
const getVessel = function (rsId) {
  return new Promise((resolve, reject) => {
    fetch('https://www.redningsselskapet.no/systemsider/getboatsxml').then(
      res => {
        return res.text().then(xml => {
          const jsonData = parser.toJson(xml, options)
          if (jsonData) {
            const vesselsArray = jsonData.rescueboats.rescueboat
            if (rsId === '*') {
              resolve(vesselsArray)
              return
            }
            const vessel = vesselsArray.find(vessel => vessel.rs === rsId)
            if (vessel) {
              resolve(vessel)
            } else {
              reject(Error(`No vessel found with id=${rsId}`))
            }
          } else {
            reject(
              Error(
                'No data received. Check xml source https://www.redningsselskapet.no/iphonefeed'
              )
            )
          }
        })
      }
    )
  })
}

module.exports = getVessel
