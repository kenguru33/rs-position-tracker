const fetchAisData = require('../lib/ais').fetchAisData

module.exports = {
  getMovingVessels (req, res) {
    fetchAisData(process.env.AIS_DATA_URL).then(aisData => {
      const vessels = aisData.filter(vessel => vessel.SOG > 1)
      res.send(vessels)
    })
  }
}
