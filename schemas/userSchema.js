let mongoose = require('mongoose');
let bcrypt = require('bcrypt');

let userSchema = new mongoose.Schema({
  username: {
    unique: true,
    type: String
  },
  password: String,
});
const SALT_WORK_FASTOR = 16;
userSchema.pre('save', function (next) {
  let user = this;
  bcrypt.genSalt(SALT_WORK_FASTOR, function (err, salt) {
    if (err) {
      return next(err)
    }
    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) {
        return next(err);
      }
      user.password = hash;
      next();
    })
  })
});
userSchema.statics = {
  fetch: function (cb) {
    return this.find({}).exec(cb)
  },
  findById: function (id, cb) {
    return this.findOne({_id: id}).exec(cb)
  }
};
userSchema.methods = {
  comparePassword: function (password, cb) {
    bcrypt.compare(password, this.password, function (err, match) {
      if (err) {
        return cb(err);
      }
      cb(null, match);
    })
  }
};
module.exports = userSchema;