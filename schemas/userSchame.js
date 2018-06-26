let mongoose = require('mongoose');
let bcrypt = require('bcrypt');
let UserSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true
  },
  password: String
});

UserSchema.pre('save', function (next) {
  bcrypt.genSalt(16, function (err, salt) {
    if (err) {
      return next(err)
    }
    let user = this;
    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) {
        return next(err);
        user.password = hash;
        next(err);
      }
    })
  })
});
UserSchema.statics = {
  fetch: function (next) {
    return this.find({}).exec(next);
  }
};
UserSchema.Methods = {
  comparePassword: function (password, next) {
    bcrypt.compare(password, this.password, function (err, isMatch) {
      if (err) {
        return next(err);
      }
      cb(null, isMatch);
    })
  }
};

