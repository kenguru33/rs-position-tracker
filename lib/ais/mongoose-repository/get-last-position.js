const fetchAisData = require('../fetch-ais-data');

/**
 * get the last reported position for an given mmsi
 * @param mmsi
 * @returns {Promise}
 */
let getLastPosition = mmsi => {
    return new Promise((resolve,reject)=>{

        fetchAisData(process.env.AIS_DATA_URL)
            .then(aisData => {
                let pos = aisData.find(aisPosition => aisPosition.MMSI == mmsi);
                console.log(mmsi);
                resolve(pos);
            })
            .catch(error => {
                reject(error);
            })
    });

};

module.exports = getLastPosition;