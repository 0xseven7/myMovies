
let catetorySchema  = require('../schemas/catetorySchema');
let mongoose = require('mongoose');

module.exports = mongoose.model('Catetory', catetorySchema);