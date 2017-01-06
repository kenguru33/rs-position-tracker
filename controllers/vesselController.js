const vessel = require('../lib/vessel');

module.exports = {

    getVessel(req,res) {
        vessel.repository.getVessel(req.params.rsid)
            .then(vessel=>{
                res.send(vessel);
            })
            .catch(error=>{
                res.send(error);
            })
    }

};