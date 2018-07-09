exports.getUser = function (req, res, next) {
  res.locals.user = req.session.user;
  return next();
};
// router.post('/user/signup', );
let User = require('../models/user');
exports.signup = function (req, res) {
  let userObj = req.body.user;
  User.find({username: userObj.username}, function (err, _user) {
    if (err) {
      console.log(err);
    }
    if (!_user.length) {
      let user = new User(userObj);
      user.save(function (err, _user) {
        if (err) {
          console.log(err);
        }
        res.redirect('/admin/userlist');
      })
    } else {
      console.log('Username has already been token!');
      res.redirect('/admin/userlist');
    }
  });
};
exports.loginRequired = function  (req, res, next) {
  let user = req.session.user;
  // 用户未登录
  if (!user) {
    return res.redirect('/showlogin')
  }
  next();
};

exports.adminRequired =  function (req, res, next) {
  let user = req.session.user;
  if (user.role <= 10 ) {
    return res.redirect('/showLogin')
  }
  next();
};
// router.get('/admin/userlist', );
exports.userList = function (req, res) {

  User.find({}, function (err, users) {
      if (err) {
        console.log(err);
      }
      res.render('userlist', {
        title: 'userlist',
        users: users
      })
  })
};
// login
exports.login = function (req, res) {
  let userObj = req.body.user;
  User.findOne({username: userObj.username}, function (err, _user) {
    if (err) {
      console.log(err);
    }
    if (_user) {
      _user.comparePassword(userObj.password, function (err, match) {
        if (err) {
          console.log(err);
        }
        if (match) {
          req.session.user = _user;
          return res.redirect('/');
        } else {
          console.log('Password is not');
          return res.redirect('back')
        }
      })
    } else {
      console.log('this user is not signup');
      res.redirect('/showSignup')
    }

  });
};
// logout
exports.logout = function (req, res) {
  req.session.user = res.locals.user = '';
  res.redirect('/');
};
exports.showSignup = function (req, res) {
  res.render('signup', {
    title: '注册'
  })
};
exports.showLogin = function (req, res) {
  res.render('login', {
    title: '登录'
  })
};