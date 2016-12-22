let mongoose = require("mongoose");

db = {
    connect: function() {
        mongoose.Promise = global.Promise;
        mongoose.connection.on('error', function (){});
        mongoose.connect('mongodb://db-test:xx1487yy@ds135798.mlab.com:35798/testbase').then(()=>{
            mongoose.connection.db.dropDatabase().then(()=>{}).catch((error=>{}))
        }).catch((error)=>{});
    },

    diconnect: function() {
        mongoose.disconnect();
    },

    seed: function () {
        db.connect();

    }
};

module.exports = db;


