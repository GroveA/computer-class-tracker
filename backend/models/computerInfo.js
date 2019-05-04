const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const computerInfoSchema = new Schema({
  name: String,
  hostName: String,
  motherboard: String,
  cpuName : String,
  cpuCores: Number,
  gpuName: String,
  ram : Number,
  online: Boolean,
  lastUpdate: Date,
  cpuLoad: Number,
  tempeture: Number
});


module.exports = mongoose.model('Computer', computerInfoSchema);
