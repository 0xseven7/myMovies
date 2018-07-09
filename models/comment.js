let mongoose = require('mongoose');
let commentSchema = require('../schemas/commentSchema');
module.exports = mongoose.model('Comment', commentSchema);