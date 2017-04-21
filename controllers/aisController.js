let ais = require('../lib/ais');
const logger = require('../lib/logger');

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
                    FromZuluTime: req.params.fromTime,
                    ToZuluTime: req.params.toTime,
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

    // Time To Go
    getTTG(req, res) {
        ais.repository.getAisTTG(req.params.mmsi, req.params.latitude, req.params.longitude)
            .then(timeToGo=>{
                res.send(timeToGo);
            })
            .catch(error=>{
               console.log(error);
               res.send(JSON.stringify(error.message));
            });
    },

    // Estimated Time of Arrival
    getETA(req, res) {
        res.send('Time On Arrival not implemented')
    },

    getLastPosition(req, res) {
        ais.repository.getLastPosition(req.params.mmsi)
            .then(aisPosition=>{
                res.send(aisPosition);
            })
            .catch(error=>res.send(error));
    },

    // Search for nearest position within a max time span for a specified time.
    getPosition(req, res) {
        ais.repository.getAisPosition(req.params.time, req.params.mmsi, req.params.mts)
            .then(aisPosition => {
                res.send(aisPosition);
            })
    }
};

