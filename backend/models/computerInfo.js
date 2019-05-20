const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const computerInfoSchema = new Schema({
  name: { type: String, default: 'Computer'},
  hostName: String,
  macAddress: String,
  motherboard: String,
  cpuName : String,
  cpuCores: Number,
  gpuName: String,
  ram : Number,
  online: Boolean,
  lastUpdate: Date,
  cpuLoad: Number,
  tempeture: Number,
  group: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Group'
  }
});


module.exports = mongoose.model('Computer', computerInfoSchema);
