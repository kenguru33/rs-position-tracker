let ais = require('../lib/ais');
const logger = require('../lib/logger');
let aisController = require('../controllers/aisController');
let homeController = require('../controllers/homeController');

module.exports = function (app) {

    app.get('/', homeController.getHome);

    app.get('/positions/:mmsi/:fromTime/:toTime', aisController.getPositions);

    app.get('/distance/:mmsi/:fromTime/:toTime', aisController.getDistance);
};