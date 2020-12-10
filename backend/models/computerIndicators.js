const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const computerInfoSchema = new Schema({
  date: Date,
  computer: { type: mongoose.Schema.Types.ObjectId, rel: 'Computer'},
  CPU: {
    LoadTotal: Number,
    TempetureTotal: Number,
    Load: [Number],
    Tempeture: [Number],
    Cores: Number
  },
  GPU: {
    Tempeture: Number,
    Load: Number,
  },
  HDD: {
    Tempeture: Number,
    UsedSpace: Number,
  },
  RAM: {
    UsedMemory: Number,
    AvaliableMemory: Number,
  }
});

module.exports = mongoose.model('ComputerIndicator', computerInfoSchema);
