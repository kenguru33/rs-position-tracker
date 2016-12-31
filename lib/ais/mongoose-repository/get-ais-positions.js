let AisPosition = require('./models/ais-position');
let moment = require('moment');
let logger = require('../../logger/index')

let getAisPosition=(fromTime, toTime, mmsi) =>{

    let aisPositions = [];
    let t1 = moment(fromTime).utc().toDate();
    let t2 = moment(toTime).utc().toDate();

    if (mmsi) {
        aisPositions = AisPosition.find(
            {
                Time_stamp : { $gte : t1, $lte : t2 },
                MMSI : mmsi
            }
        );
    } else {
        aisPositions = AisPosition.find({Time_stamp : { $gte : t1, $lte : t2 } });
    }

    return aisPositions;
};

module.exports = getAisPosition;