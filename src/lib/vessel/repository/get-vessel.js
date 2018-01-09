// const xml2js = require('xml2js');
const parser = require('xml2json')
const fetch = require('node-fetch')

let options = {
  object: true,
  reversible: false,
  coerce: false,
  sanitize: true,
  trim: true,
  arrayNotation: false
}

// Fixme: Should be getting data from MDS.
let getVessel = function (rsId) {
  return new Promise((resolve, reject) => {
    fetch('https://www.redningsselskapet.no/systemsider/getboatsxml').then(
      res => {
        return res.text().then(xml => {
          let jsonData = parser.toJson(xml, options)
          if (jsonData) {
            let vesselsArray = jsonData.rescueboats.rescueboat
            if (rsId === '*') {
              resolve(vesselsArray)
              return
            }
            let vessel = vesselsArray.find(vessel => vessel.rs === rsId)
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
