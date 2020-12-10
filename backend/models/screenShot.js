const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const screenShotSchema = new Schema({
  date: Date,
  name: String,
  proccess: [String],
  active: String,
  computer: { type: mongoose.Schema.Types.ObjectId, rel: 'Computer'},
});

module.exports = mongoose.model('ScreenShot', screenShotSchema);
