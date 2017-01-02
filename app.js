let config = require('./config');
let logger = require("./lib/logger");
let ais = require('./lib/ais');

let init = function () {

    let importData = function () {
        ais.fetchAisData(config.aisDataUrl)
            .then(aisData => ais.repository.addAisPositions(aisData)
                .then(data => logger.debug(`All new ais positions written to database. (${data.length})`))
            )
            .catch(error =>{logger.error(`Fetching ais data from ${config.aisDataUrl} failed! ${error}`)});

        ais.repository.getAisPositions("2016-12-29T09:58:00", "2017-01-02T23:00:00",258144000)
        //.then(aisData=>removeAisPositions(aisData))
            .then(aisData=>console.log("distanse: ",ais.repository.getDistance(aisData) + " " + aisData.length))
            .catch(error=>logger.error(error));
    };

    setInterval(importData,config.fetchDataInterval);
};

init();

ais.repository.getAisPositions("2016-12-29T09:58:00", "2017-01-02T23:00:00",258144000)
    //.then(aisData=>removeAisPositions(aisData))
    .then(aisData=>console.log('Tidsrom: 2016-12-29T09:58:00 - 2016-12-31T14:00:00 mmsi: 257654700 - distanse(nm):',ais.repository.getDistance(aisData)))
    .catch(error=>logger.error(error));

