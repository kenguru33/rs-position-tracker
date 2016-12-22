const chalk = require('chalk');
const fetch = require('node-fetch');

let AisPosition = require('./models/ais-position');

let storeAisPositions = (jsonDataArray)=>{
    let storeOperations = jsonDataArray.map(jsonAisPosition => {
        let aisPosition = new AisPosition(jsonAisPosition);
        return aisPosition.save().then((aisData)=>{
            console.log(chalk.green(`MMSI: ${aisData.MMSI} stored to database!` + " - " + chalk.blue(aisData.Ship_name)));
        }).catch((error)=>{
            if(error.code == 11000) {
                console.log(chalk.red(`MMSI: ${jsonAisPosition.MMSI} Skipping... (Duplicate detected!)` + " - " + chalk.blue(jsonAisPosition.Ship_name)));
            } else {
                console.log(error);
            }
        });
    });

    return Promise.all(storeOperations);
};

module.exports = storeAisPositions;
