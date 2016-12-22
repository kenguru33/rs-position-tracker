let AisPosition = require('./../models/ais-position');
let mapToAisPositionArray = function (jsonData) {
    let aisPositions = [];
    for(let pos of jsonData) {
        aisPositions.push(new AisPosition(pos));
    }
    return aisPositions;
};

module.exports = mapToAisPositionArray;
