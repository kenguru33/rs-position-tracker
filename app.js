require('dotenv').config();
//let config = require('./config');
let logger = require("./lib/logger");
let ais = require('./lib/ais');
const chalk = require('chalk');
const express = require('express');


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

/**
 * Serving ais position data. mmsi=* -> all vessels
 *
 */
let app = express();

app.get('/', function (req, res) {
   res.send("ais API - Bernt Anker (Redningsselskapet) <bernt.anker@rs.no>");
});

/**
 * Gets ais positions for vessel in time interval.
 */
app.get('/positions/:mmsi/:fromTime/:toTime', function (req, res) {

    if (req.params.mmsi=='*') {
        req.params.mmsi = null;
    }

    ais.repository.getAisPositions(req.params.fromTime,req.params.toTime,req.params.mmsi)
        .then(aisData => {
            res.send(aisData);
        })
        .catch(error=>{
            logger.error(error.stack);
            res.send(JSON.stringify(error.message));
        });
});

app.get('/distance/:mmsi/:fromTime/:toTime', function (req, res) {

    ais.repository.getAisPositions(req.params.fromTime, req.params.toTime, req.params.mmsi)
     .then(aisData=>{
         distance = ais.repository.getDistance(aisData);

         res.send({
             MMSI: req.params.mmsi,
             FromLocalTime: req.params.fromTime,
             ToLocalTime: req.params.toTime,
             PositionCount: aisData.length,
             Distance_nm: distance*0.539956803,
             Distance_km: distance
         });

     })
     .catch(error=>{
         logger.error(error.stack);
         res.send(JSON.stringify(error.message));
     });
});

app.listen(process.env.PORT, function () {
    console.log(chalk.green(`Web Service started on port ${process.env.PORT}`));
});


/*ais.repository.getAisPositions("2016-12-29T09:58:00", "2017-01-04T23:00:00",257013400)
 //.then(aisData=>removeAisPositions(aisData))
 .then(aisData=>console.log("distanse: ",ais.repository.getDistance(aisData) + " " + aisData.length))
 .catch(error=>logger.error(error.stack));*/

//http://aistracker.herokuapp.com/positions/259460000/2017-01-02T09:45:00/2017-01-04T10:00:00