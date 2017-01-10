const moment = require('moment');
const fetchAisData = require('../fetch-ais-data');
const getLastPosition = require('./get-last-position');
const getDistance = require('./get-distance');


/**
 * Calculates Time To Go to a target position and returns json object { TTG: <value>, SOG: <value> }
 * @param mmsi
 * @param latitude
 * @param longitude
 * @returns {Promise}
 */
let getAisTTG = (mmsi,latitude,longitude) => {

    let targetAisPosition = {  Decimal_Latitude: latitude, Decimal_Longitude: longitude };

    return new Promise((resolve, reject) => {

        getLastPosition(mmsi)
            .then(lastPos => {
                let speed = lastPos.SOG*1.852; // km/h
                let distanceFromLastPos = getDistance([lastPos,targetAisPosition]);
                let time = distanceFromLastPos/speed;

                let timeLastPos = moment(lastPos.Time_stamp).utc().unix();
                let timeNow = moment().unix();

                let timeCorrectionSeconds = (timeNow-timeLastPos);

                let distanceCorrection = speed*(timeCorrectionSeconds/3600);

                let timeToTarget = 60*(distanceFromLastPos-distanceCorrection)/speed;

                resolve({ TTG: timeToTarget, SOG: speed*0.5399568034557235 });
            })
            .catch(error=>{
               console.log('getLastPosition',error);
            });
    });

};

module.exports = getAisTTG;

