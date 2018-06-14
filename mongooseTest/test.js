let mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

let testSchema = new mongoose.Schema({
  name: String,
  age: Number,
  sex: String
});
module.exports = mongoose.model('Test', testSchema);