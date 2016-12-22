let Ais = require('./lib/ais');
let config = require('./config');
const winston = require('winston');
let mongoose = require('mongoose');

mongoose.Promise = global.Promise;

let db = mongoose.connection;
db.on('connecting', function() {
    winston.info('MongoDB: connecting');
});

db.on('error', function(error) {
    winston.error('Error in MongoDb connection: ' + error);
    winston.debug(error);
    mongoose.disconnect();
});
db.on('connected', function() {
    winston.info('MongoDB: connected!');
});
db.once('open', function() {
    console.info('MongoDB: connection open');
});
db.on('reconnected', function () {
    console.info('MongoDB: reconnected');
});
db.on('disconnected', function() {
    console.info('MongoDB: disconnected');
    setTimeout(()=>{
        mongoose.connect(config.dbURI, config.dbOptions);
    },1000);
});

winston.info("Starting service...");
mongoose.connect(config.dbURI, config.dbOptions);

let init = function () {
    let ais = new Ais();
    let importData = function () {
        ais.fetchAisData(config.aisDataUrl)
            .then(aisData => {ais.storeAisData(aisData);})
            .catch(error =>{winston.error(`Fetching ais data from ${config.aisDataUrl} failed!`)});
    };
    setInterval(importData,config.fetchDataInterval);
};

init();


