let distance = require('gps-distance');

const nm_Const = 0.539956803;

let getDistance = function(jsonAisPositions) {

    let locations = [];

    jsonAisPositions.map((aisPosition) => {
        locations.push([aisPosition.Decimal_Latitude,aisPosition.Decimal_Longitude]);
    });

    return distance(locations)*nm_Const;
};

module.exports = getDistance;

