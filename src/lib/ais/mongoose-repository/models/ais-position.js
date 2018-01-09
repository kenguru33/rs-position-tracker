const mongoose = require('mongoose')
const Schema = mongoose.Schema

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
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 60 * 60 * 24 * process.env.AIS_DATA_STORED_IN_DAYS
  }
})

aisPositionSchema.index({ MMSI: 1, Time_stamp: 1 }, { unique: true })
if (!aisPositionSchema.options.toObject) aisPositionSchema.options.toObject = {}
aisPositionSchema.options.toObject.transform = function (doc, ret, options) {
  // remove the _id of every document before returning the result
  delete ret._id
  delete ret.__v
  delete ret.createdAt
  return ret
}

module.exports = mongoose.model('Ais Positions', aisPositionSchema)
