let AisPosition = require('./models/ais-position');
let moment = require('moment');
let logger = require('../../logger');

/**
 *
 * @param time
 * @param mmsi
 * @returns {Promise.<*>}
 */
let getAisPosition = async (time, mmsi) => {

    let timeWindowMinutes = 20; //TODO: Set this in environment param

    let unixTime = moment.utc(time).unix();

    let t1 = moment.utc(time).subtract(timeWindowMinutes/2, 'minutes').format("YYYY-MM-DDTHH:mm:ss");
    let t2 = moment.utc(time).add(timeWindowMinutes/2, 'minutes').format("YYYY-MM-DDTHH:mm:ss");

    try {
        let positions = await AisPosition.find({
            Time_stamp : { $gte : t1, $lte : t2 },
            MMSI : mmsi
        });

        let nearestPos = null;
        let smallestTimeDiff = timeWindowMinutes*1000/2;


        positions.map(position=>{

            let diff = Math.abs( unixTime - moment.utc(position.Time_stamp).unix() );

            console.log(diff);

            if (diff < smallestTimeDiff) {
                smallestTimeDiff = diff;
                nearestPos = position;
            }
        });

        return nearestPos;
    }
    catch (error) {
        logger.error(error);
    }
};

module.exports = getAisPosition;
