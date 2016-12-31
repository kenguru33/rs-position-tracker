const mongoose = require("mongoose");
const db = require('../../../../utils/db');

const Schema = mongoose.Schema;

const aisPositionSchema = new Schema({
    MMSI: { type: Number, required: true, unique: false },
    Ship_name: { type: String, required: false },
    Destination: { type: String, required: false },
    Latitude: { type: String, required: true },
    Longitude: { type: String, required: true },
    Decimal_Latitude: { type: Number, required: true },
    Decimal_Longitude: { type: Number, required: true },
    Time_stamp: { type: Date, required: true },
    SOG: { type: String, required: false },
    COG: { type: String, required: false },
    createdAt: { type: Date, default: Date.now },

});

aisPositionSchema.index({MMSI:1, Time_stamp:1}, {unique: true});

module.exports = db.model('Ais Positions', aisPositionSchema);