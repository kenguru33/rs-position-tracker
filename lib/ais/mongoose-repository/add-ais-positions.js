const logger = require('../../logger/index');
let AisPosition = require('./models/ais-position');

let addAisPositions = (jsonDataArray)=>{

    let storeOperations = jsonDataArray.map(jsonAisPosition => {

        return new AisPosition(jsonAisPosition).save()
            .then(aisData => logger.debug('SAVE',`${aisData}`))
            // put a catch block here to prevent promise.all to fail on error.
            .catch(error => logger.warn('SAVE', `${error}`));
    });

    return Promise.all(storeOperations);

};

module.exports = addAisPositions;
