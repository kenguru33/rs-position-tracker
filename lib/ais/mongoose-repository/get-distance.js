let distance = require('gps-distance');

let locations = [];

const nm_Const = 0.539956803;

let getDistance = function(jsonAisPositions) {
    locMapper(jsonAisPositions);
    return distance(locations)*nm_Const;
};

let locMapper = (jsonAisPositions) => {
  jsonAisPositions.map((aisPosition) => {
      locations.push([aisPosition.Decimal_Latitude,aisPosition.Decimal_Longitude]);
  });
};

module.exports = getDistance;

