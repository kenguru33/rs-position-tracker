let ais = require('../lib/ais');

module.exports = {

    getPositions(req,res) {
        if (req.params.mmsi=='*') {
            req.params.mmsi = null;
        }
        ais.repository.getAisPositions(req.params.fromTime,req.params.toTime,req.params.mmsi)
            .then(aisData => {
                res.send(aisData);
            })
            .catch(error=>{
                logger.error(error.stack);
                res.send(JSON.stringify(error.message));
            });
    },

    getDistance(req,res) {
        ais.repository.getAisPositions(req.params.fromTime, req.params.toTime, req.params.mmsi)
            .then(aisData=>{
                distance = ais.repository.getDistance(aisData);

                res.send({
                    MMSI: req.params.mmsi,
                    FromLocalTime: req.params.fromTime,
                    ToLocalTime: req.params.toTime,
                    PositionCount: aisData.length,
                    Distance_nm: distance*0.539956803,
                    Distance_km: distance
                });

            })
            .catch(error=>{
                logger.error(error.stack);
                res.send(JSON.stringify(error.message));
            });
    },

};

