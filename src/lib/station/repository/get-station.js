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
const getStation = function (name) {
  return new Promise((resolve, reject) => {
    fetch('https://www.redningsselskapet.no/systemsider/getstationsxml').then(
      res => {
        return res.text().then(xml => {
          const jsonData = parser.toJson(xml, options)
          if (jsonData) {
            const stationsArray = jsonData.stations.station
            if (name === '*') {
              resolve(stationsArray)
              return
            }
            const station = stationsArray.find(
              station => station.name.toUpperCase() === name.toUpperCase()
            )
            if (station) {
              resolve(station)
            } else {
              reject(Error(`No vessel found with id=${name}`))
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

module.exports = getStation
