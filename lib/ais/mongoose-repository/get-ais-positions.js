let AisPosition = require('./models/ais-position');
let moment = require('moment');
let logger = require('../../logger/index')

let getAisPosition=(fromTime, toTime) =>{

    let t1 = moment(fromTime).utc().toDate();
    let t2 = moment(toTime).utc().toDate();

    return AisPosition.find({Time_stamp : { $gte : t1, $lte : t2 } });
};

module.exports = getAisPosition;