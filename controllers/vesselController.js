const vessel = require('../lib/vessel');
const fetchAisData = require('../lib/ais').fetchAisData;

module.exports = {

    getVessel(req,res) {
        vessel.repository.getVessel(req.params.rsid)
            .then(vessel=>{
                res.send(vessel);
            })
            .catch(error=>{
                res.send(error);
            })
    },

    getMovingVessels(req,res) {
      fetchAisData(process.env.AIS_DATA_URL)
          .then( aisData => {
              let vessels = aisData.filter( vessel => vessel.SOG > 1);
              console.log(vessels);
              res.send(vessels);
      });
    }
};

