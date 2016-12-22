let Ais = require('./lib/ais');
config = require('./config');
const mongoose = require("mongoose");

mongoose.Promise = global.Promise;
mongoose.connect(config.dbUri, { server: { reconnectTries: Number.MAX_VALUE } }).then(()=>{
    console.log("Connected to database.");
}).catch((eroor)=>{
    console.log("Connection to database failed.");
});

ais = new Ais();
let importData = function () {
   ais.fetchAisData(config.aisDataUrl)
       .then(aisData => {ais.storeAisData(aisData);})
       .catch(error =>{console.log(error);});
};
setInterval(importData,config.fetchDataInterval);


