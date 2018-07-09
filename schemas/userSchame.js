let mongoose = require('mongoose');
let bcrypt = require('bcrypt');
let UserSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true
  },
  password: String,

  // 0: normal user
  // 1: verified user
  // 2: professonal user
  // 3-9: 保留
  // >10: admin
  // >50: super admin
  role: {
    type: Number,
    default: 0
  }
});

UserSchema.pre('save', function (next) {
  let user = this;
  bcrypt.genSalt(16, function (err, salt) {
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
UserSchema.statics = {
  fetch: function (next) {
    return this.find({}).exec(next);
  }
};
UserSchema.methods = {
  comparePassword: function (password, next) {
    bcrypt.compare(password, this.password, function (err, isMatch) {
      if (err) {
        return next(err);
      }
      next(null, isMatch);
    })
  }
};
module.exports = UserSchema;

