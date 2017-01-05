require('dotenv').config();
let logger = require("./lib/logger");
let ais = require('./lib/ais');
const chalk = require('chalk');
const express = require('express');
const apiRouter = require('./routes/api-router');

// init ais Import Service

let importData = function () {
    ais.fetchAisData(process.env.AIS_DATA_URL)
        .then(aisData => ais.repository.addAisPositions(aisData)
            .then(data => logger.debug(`All new ais positions written to database. (${data.length})`))
        )
        .catch(error =>{logger.error(`Fetching ais data from ${process.env.AIS_DATA_URL} failed! ${error}`)});
};

setInterval(importData,process.env.AIS_DATA_FETCH_INTERVAL);

console.log(chalk.green("Ais Import Service started."));


// init express application

let app = express();

app.use("/api", apiRouter);

app.use(express.static('public'));

app.listen(process.env.PORT, function () {
    console.log(chalk.green(`Web Service started on port ${process.env.PORT}`));
});


/*ais.repository.getAisPositions("2016-12-29T09:58:00", "2017-01-04T23:00:00",257013400)
 //.then(aisData=>removeAisPositions(aisData))
 .then(aisData=>console.log("distanse: ",ais.repository.getDistance(aisData) + " " + aisData.length))
 .catch(error=>logger.error(error.stack));*/

//http://aistracker.herokuapp.com/positions/259460000/2017-01-02T09:45:00/2017-01-04T10:00:00