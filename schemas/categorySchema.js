let mongoose = require('mongoose');
let bcrypt = require('bcrypt');
let objId = mongoose.Schema.Types.ObjectId;

let CatetorySchema = new mongoose.Schema({
  name: String,
  movies: [{type: objId, ref: 'Movie'}],
  description: String
});
CatetorySchema.statics = {
  fetch: function (cb) {
    return this
      .find({})
      .sort('meta.updateAt')
      .exec(cb);
  },
  findById: function (id, cb) {
    return this
      .findOne({_id: id})
      .exec(cb);
  }
};
module.exports = CatetorySchema;

