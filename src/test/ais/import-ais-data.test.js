let importAisData = require('../../lib/ais/fetch-ais-data')
let assert = require('assert')
let AisPosition = require('.././ais-position')
let mongoose = require('mongoose')

before(() => {
  mongoose.connect('mongodb uri here')
})

after(() => {
  mongoose.disconnect()
})

let url = 'http://ais.rs.no/aktive_pos.json'

describe('import ais data', () => {
  xit('returns an array of valid ais-position', () => {
    return importAisData(url)
      .then(aisData => {
        assert.ok(aisData.length > 0, 'No Ais Data imported')
        for (let pos of aisData) {
          return new AisPosition(pos).validate().then(() => {
            assert.ok(true)
          })
        }
      })
      .catch(error => {
        assert.ok(false, error)
      })
  })

  xit('finds dulicates and removes them from import array', () => {
    return AisPosition.find({}).then(aisPositions => {
      console.log(aisPositions)
    })
  })
})
