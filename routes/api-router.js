const express = require('express');
const logger = require('../lib/logger');
const aisController = require('../controllers/aisController');
const vesselController = require("../controllers/vesselController.js");
var stationController = require("../controllers/stationController.js");

const api = express.Router();

api.get('/get_positions/:mmsi/:fromTime/:toTime', aisController.getPositions);
api.get('/get_distance/:mmsi/:fromTime/:toTime', aisController.getDistance);
api.get('/get_vessel/:rsid', vesselController.getVessel);
api.get('/get_moving_vessels', vesselController.getMovingVessels);
api.get('/get_station/:name', stationController.getStation);

module.exports = api;