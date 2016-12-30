let config = require('./config');
let logger = require("./lib/logger");
let addAisPositions = require('./lib/ais/mongoose-repository/add-ais-positions');
let getAisPositions = require("./lib/ais/mongoose-repository/get-ais-positions");
let removeAisPositions = require('./lib/ais/mongoose-repository/remove-ais-positions');
let fetchAisData = require('./lib/ais/fetch-ais-data');


let init = function () {

    let importData = function () {
        fetchAisData(config.aisDataUrl)
            .then(aisData => addAisPositions(aisData)
                .then(data => logger.debug(`All new ais positions written to database. (${data.length})`))
            )
            .catch(error =>{logger.error(`Fetching ais data from ${config.aisDataUrl} failed! ${error}`)});
    };
    setInterval(importData,config.fetchDataInterval);
};

init();

getAisPositions("2016-12-29T09:58:00", "2016-12-31T14:00:00")
    .then(aisData=>removeAisPositions(aisData))
    .catch(error=>logger.error(error));
