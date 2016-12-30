module.exports =  Ais = function() {
    this.fetchAisData = require('./fetch-ais-data');
    this.storeAisData = require('./store-ais-data');
    this.removeAisPositions = require('./remove-ais-positions');
    this.getAisPositions = require('./get-ais-positions');
};

