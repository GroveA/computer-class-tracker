const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const computerInfoSchema = new Schema({
  date: Date,
  computer: { type: ObjectId, rel: 'Computer'},

});

module.exports = mongoose.model('ComputerIndicator', computerInfoSchema);
