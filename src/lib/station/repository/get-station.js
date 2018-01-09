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
let getStation = function (name) {
  return new Promise((resolve, reject) => {
    fetch('https://www.redningsselskapet.no/systemsider/getstationsxml').then(
      res => {
        return res.text().then(xml => {
          let jsonData = parser.toJson(xml, options)
          if (jsonData) {
            let stationsArray = jsonData.stations.station
            if (name === '*') {
              resolve(stationsArray)
              return
            }
            let station = stationsArray.find(
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
