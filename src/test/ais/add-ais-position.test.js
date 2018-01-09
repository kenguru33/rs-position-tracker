let addAisPosition = require('../../lib/ais/rubish/add-ais-position')
let AisPosition = require('.././ais-position')
let assert = require('assert')
let db = require('./helper')

before(() => {
  db.connect()
})

after(() => {
  db.diconnect()
})

describe('add-ais-position', () => {
  xit('add a single ais postion', () => {
    return addAisPosition(new AisPosition({ MMSI: 9999 }))
  })
})
