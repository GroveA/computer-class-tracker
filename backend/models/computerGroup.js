const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const computerGroupSchema = new Schema({
  name: String
});


module.exports = mongoose.model('Group', computerGroupSchema);
