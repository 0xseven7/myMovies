let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let ObjId = Schema.Types.ObjectId;
let CommentSchema = new mongoose.Schema({
  movie: {
    type: ObjId,
    ref: 'Movie'
  },
  from: {
    type: ObjId,
    ref: 'User'
  },
  to: {
    type: ObjId,
    ref: 'User'
  },
  content: String

});
// MovieSchema.pre('save', function (next) {
//   if (this.isNew) {
//     this.meta.createAt = this.meta.updateAt = Date.now();
//   } else {
//     this.meta.updateAt = Date.now();
//   }
// });
CommentSchema.statics = {
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

module.exports = CommentSchema;