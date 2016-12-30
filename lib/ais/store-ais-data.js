const logger = require('../logger');
let AisPosition = require('./models/ais-position');

let storeAisPositions = (jsonDataArray)=>{

    let storeOperations = jsonDataArray.map(jsonAisPosition => {

        return new AisPosition(jsonAisPosition).save()
            .then(aisData => logger.info('SAVE',`${aisData}`))
            // put a catch block here to prevent promise.all to fail on error.
            .catch(error => logger.error('SAVE',`MMSI=${aisPosition.MMSI}: ${error.message}`));
    });

    return Promise.all(storeOperations);

};

module.exports = storeAisPositions;
