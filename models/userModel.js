let mongoose = require('mongoose');
let  userSchema = require('../schemas/userSchema');
module.exports = mongoose.model('User', userSchema);