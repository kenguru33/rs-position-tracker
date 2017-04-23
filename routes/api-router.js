const express = require('express');
const logger = require('../lib/logger');
const aisController = require('../controllers/aisController');
const vesselController = require("../controllers/vesselController.js");
const stationController = require("../controllers/stationController.js");

const api = express.Router();

api.get('/get_positions/:mmsi/:fromTime/:toTime', aisController.getPositions);
api.get('/get_distance/:mmsi/:fromTime/:toTime', aisController.getDistance);
api.get('/get_vessel/:rsid', vesselController.getVessel);
api.get('/get_moving_vessels', vesselController.getMovingVessels);
api.get('/get_station/:name', stationController.getStation);
api.get('/get_TTG/:mmsi/:latitude/:longitude', aisController.getTTG);
api.get('/get_ETA/:latitude/:longitude', aisController.getETA);
api.get('/get_last_position/:mmsi', aisController.getLastPosition);
api.get('/get_position/:mmsi/:time', aisController.getPosition);
module.exports = api;