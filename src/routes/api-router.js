const express = require('express')
const aisController = require('../controllers/aisController')
const vesselController = require('../controllers/vesselController.js')

const api = express.Router()

/**
 * @swagger
 *
 * /api/get_positions/{mmsi}/{fromTime}/{toTime}:
 *   get:
 *     description: Get Vessel posistions by mmsi and timespan (use zulu time)
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: mmsi
 *         description: Maritime Mobile Service Identity
 *         in: path
 *         required: true
 *         example: 259460000
 *         type: string
 *       - name: fromTime
 *         description: Start of timespan (YYYY-MM-DDTHH:MM:SS)
 *         in: path
 *         required: true
 *         example: 2019-11-15T09:45:00
 *         type: string
 *       - name: toTime
 *         description: End of timespan (YYYY-MM-DDTHH:MM:SS)
 *         in: path
 *         required: true
 *         example: 2019-11-15T23:00:00
 *         type: string
 *     responses:
 *       200:
 *         description: Ais Data
 */
api.get('/get_positions/:mmsi/:fromTime/:toTime', aisController.getPositions)

/**
 * @swagger
 *
 * /api/get_distance/{mmsi}/{fromTime}/{toTime}:
 *   get:
 *     description: Get traveled distance in a given period
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: mmsi
 *         description: Maritime Mobile Service Identity
 *         in: path
 *         required: true
 *         example: 259460000
 *         type: string
 *       - name: fromTime
 *         description: Start of timespan (YYYY-MM-DDTHH:MM:SS)
 *         in: path
 *         required: true
 *         example: 2019-11-15T09:45:00
 *         type: string
 *       - name: toTime
 *         description: End of timespan (YYYY-MM-DDTHH:MM:SS)
 *         in: path
 *         required: true
 *         example: 2019-11-15T23:00:00
 *         type: string
 *     responses:
 *       200:
 *         description: Distance
 */
api.get('/get_distance/:mmsi/:fromTime/:toTime', aisController.getDistance)

/**
 * @swagger
 *
 * /api/get_moving_vessels:
 *   get:
 *     description: Get vessels that are one the move at htis moment
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Moving Vessels
 */
api.get('/get_moving_vessels', vesselController.getMovingVessels)

/**
 * @swagger
 *
 * /api/get_TTG/{mmsi}/{longitude}/{latitude}:
 *   get:
 *     description: Time To Go
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: mmsi
 *         description: Maritime Mobile Service Identity
 *         in: path
 *         required: true
 *         example: 259460000
 *         type: number
 *       - name: latitude
 *         description: Latitude (decimal)
 *         in: path
 *         required: true
 *         example: 68
 *         type: number
 *       - name: longitude
 *         description: Longitude (devimal)
 *         in: path
 *         required: true
 *         example: 12
 *         type: number
 *     responses:
 *       200:
 *         description: Distance
 */
api.get('/get_TTG/:mmsi/:latitude/:longitude', aisController.getTTG)

/**
 * @swagger
 *
 * /api/get_ETA/{mmsi}/{longitude}/{latitude}:
 *   get:
 *     description: Estimated Time at Arival
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: mmsi
 *         description: Maritime Mobile Service Identity
 *         in: path
 *         required: true
 *         example: 259460000
 *         type: number
 *       - name: latitude
 *         description: Latitude (decimal)
 *         in: path
 *         required: true
 *         example: 68
 *         type: number
 *       - name: longitude
 *         description: Longitude (devimal)
 *         in: path
 *         required: true
 *         example: 12
 *         type: number
 *     responses:
 *       200:
 *         description: Estimated Time at Arival
 */

/**
 * @swagger
 *
 * /api/get_last_position/{mmsi}:
 *   get:
 *     description: Get last registrated position
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: mmsi
 *         description: Maritime Mobile Service Identity
 *         in: path
 *         required: true
 *         example: 259460000
 *         type: number
 *     responses:
 *       200:
 *         description: Get last registrated position
 */
api.get('/get_last_position/:mmsi', aisController.getLastPosition)

/**
 * @swagger
 *
 * /api/get_position/{mmsi}/{time}:
 *   get:
 *     description: Get position at a given time
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: mmsi
 *         description: Maritime Mobile Service Identity
 *         in: path
 *         required: true
 *         example: 259460000
 *         type: string
 *       - name: time
 *         description: Date (YYYY-MM-DDTHH:MM:SS)
 *         in: path
 *         required: true
 *         example: 2019-11-15T09:45:00
 *         type: string
 *     responses:
 *       200:
 *         description: Vessel position at a given time. Position is returned if found in defined timespan +/- from given time. (Timespan is set in app config)
 */
api.get('/get_position/:mmsi/:time', aisController.getPosition)

module.exports = api
