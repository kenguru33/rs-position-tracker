let AisPosition = require('./models/ais-position');
let mongoose = require('mongoose');
let moment = require('moment');
let logger = require('../../logger/index')

/**
 *
 * @param fromTime  - start date and time
 * @param toTime    - end date and time
 * @param mmsi      - which vessel to fetch data for. Optional, if not passed, all vessel are fetched
 * @returns {Promise.<Array>} - returns an array of points
 */
let getAisPosition = (fromTime, toTime, mmsi) =>{

    let aisPositions;

    let t1 = fromTime;
    let t2 = toTime;

    if (mmsi) {
        aisPositions = AisPosition.find(
            {
                Time_stamp : { $gte : t1, $lte : t2 },
                MMSI : mmsi
            }
        );
    } else {
        aisPositions = AisPosition.find(
            {
                Time_stamp : { $gte : t1, $lte : t2 }
            }
        );
    }

    return aisPositions;
};

module.exports = getAisPosition;