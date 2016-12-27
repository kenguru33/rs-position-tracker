let Ais = require('./lib/ais');
let config = require('./config');
let mongoose = require("mongoose");
let logger = require("./utils/logger");




let init = function () {
    let ais = new Ais();
    let importData = function () {
        ais.fetchAisData(config.aisDataUrl)
            .then(aisData => {ais.storeAisData(aisData);})
            .catch(error =>{logger.error(`Fetching ais data from ${config.aisDataUrl} failed!`)});
    };
    setInterval(importData,config.fetchDataInterval);
};



init();

