let Ais = require('./lib/ais');
let config = require('./config');
let mongoose = require("mongoose");
let logger = require("./lib/logger");
let getAisPosition = require("./lib/ais/get-ais-positions");
let removeAisPositions = require('./lib/ais/remove-ais-positions');


let init = function () {
    let ais = new Ais();

    getAisPosition("2016-12-29T09:58:00", "2016-12-31T14:00:00")
        .then(aisData=>removeAisPositions(aisData))
        .catch(error=>logger.error(error));

    let importData = function () {
        ais.fetchAisData(config.aisDataUrl)
            .then(aisData => ais.storeAisData(aisData)
                .then(data => logger.debug(`All new ais positions written to database. (${data.length})`))
                .catch(error=>logger.error("Bulk save failed. This should not happened!"))
            )
            .catch(error =>{logger.error(`Fetching ais data from ${config.aisDataUrl} failed!`)});
    };
    setInterval(importData,config.fetchDataInterval);
};


init();

