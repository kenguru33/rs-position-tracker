const chalk = require('chalk');
const fetch = require('node-fetch');
const winston = require('winston');

let AisPosition = require('./models/ais-position');

let storeAisPositions = (jsonDataArray)=>{
    let storeOperations = jsonDataArray.map(jsonAisPosition => {
        let aisPosition = new AisPosition(jsonAisPosition);
        return aisPosition.save().then((aisData)=>{
            winston.info(chalk.green(`MMSI: ${aisData.MMSI} stored to database!` + " - " + chalk.blue(aisData.Ship_name)));
        }).catch((error)=>{
            if(error.code == 11000) {
                winston.warn(chalk.red(`MMSI: ${jsonAisPosition.MMSI} Skipping... (Duplicate detected!)` + " - " + chalk.blue(jsonAisPosition.Ship_name)));
            } else {
                winston.error(error);
            }
        });
    });

    return Promise.all(storeOperations);
};

module.exports = storeAisPositions;
