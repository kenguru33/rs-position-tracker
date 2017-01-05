const express = require('express');
let ais = require('../lib/ais');
const logger = require('../lib/logger');
let aisController = require('../controllers/aisController');

const api = express.Router();

api.get('/get_positions/:mmsi/:fromTime/:toTime', aisController.getPositions);
api.get('/get_distance/:mmsi/:fromTime/:toTime', aisController.getDistance);

module.exports = api;