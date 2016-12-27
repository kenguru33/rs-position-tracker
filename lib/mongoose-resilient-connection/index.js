const winston = require('winston');
let mongoose = require('mongoose');
var config = require("../../config.js");

let MongooseResilientConnection = function (uri,options) {

    mongoose.Promise = global.Promise;

    let running = false;

    this.start = function () {
      running = true;
      console.log("starting");
      mongoose.connect(uri,options);
    };

    this.stop = function () {
      running = false;
      console.log("stopping");
      mongoose.disconnect();
    };

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
        console.log("running: ", running);
        self  = this;
        if (running) {
            setTimeout(()=>{
                mongoose.connect(uri, options);
            },1000);
        }
    });

};

module.exports = new MongooseResilientConnection(config.dbURI,config.dbOptions);
