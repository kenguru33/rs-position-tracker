let AisPosition = require('./models/ais-position');
let logger = require('../logger');

let removeAisPositions = function(jsonAisDataArray) {

    let removeOperations = jsonAisDataArray.map(jsonAisPosition => {

        return new AisPosition(jsonAisPosition).remove()
           .then(aisData=> logger.info('REMOVE', `MMSI:${aisData.MMSI} Time_stamp:${aisData.Time_stamp}`))
           // put a catch block here to prevent promise.all to fail on error.
           .catch(error=>logger.error('REMOVE',error));
    });

    return Promise.all(removeOperations);

};

module.exports = removeAisPositions;