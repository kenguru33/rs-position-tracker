let AisPosition = require('./models/ais-position');
let moment = require('moment');
let logger = require('../../logger');

let callCount = 0; // This needs to be reset for every initial call to getAisPosition.

/**
 *
 * @param time
 * @param mmsi
 * @param maxTimeSpanMinutes - +/- in minutes to span right and left in step of minutes
 * @returns {Promise.<*>}
 */
let getAisPosition = async (time, mmsi, maxTimeSpanMinutes=process.env.MAX_TIME_SPAN_IN_MINUTES) => {

    let t1 = moment(time).subtract(callCount, 'minutes').format("YYYY-MM-DDTHH:mm:ss");
    let t2 = moment(time).add(callCount, 'minutes').format("YYYY-MM-DDTHH:mm:ss");

    try {
        let positions = await AisPosition.find({
            Time_stamp : { $gte : t1, $lte : t2 },
            MMSI : mmsi
        });
        if (positions.length) {
            logger.info(`${positions.length} positions found.`);
            logger.info(`${positions}`);
            logger.info(`Selecting most present position of ${positions.length} positions.`);
            resetCallcount();
            return positions[positions.length-1];
        }
        logger.info(`No positions found in TimeSpan ${callCount*2} minutes. Increasing timespan.`);
        callCount++;
        if (callCount < maxTimeSpanMinutes/2) {
            return getAisPosition(time,mmsi,maxTimeSpanMinutes)
        }
        logger.info(`No positions found. I give up and returning empty array`);
        resetCallcount();
        return [];
    }
    catch (error) {
        logger.error(error);
    }
};

const resetCallcount = function() {
    callCount = 0;
};

module.exports = getAisPosition;
