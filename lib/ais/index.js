module.exports =  Ais = function() {
    this.fetchAisData = require('./fetch-ais-data');
    this.addAisPositions = require('./mongoose-repository/add-ais-positions');
    this.removeAisPositions = require('./mongoose-repository/remove-ais-positions');
    this.getAisPositions = require('./mongoose-repository/get-ais-positions');
};

