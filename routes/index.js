let express = require('express');
let router = express.Router();
let Movie = require('../models/movies');
let underScore = require('underscore');
let User = require('../models/userModel');

// pre handle user
router.use(function (req, res, next) {
  res.locals.user = req.session.user;
  return next();
});


/* GET home page. */
router.get('/', function (req, res, next) {
  console.log(req.session.user);
  Movie.fetch(function (err, movies) {
    if (err) {
      return next(err);
    }
    res.render('index', {
      title: '首页',
      movies: movies,
    });
  });
});
// detail页面
router.get('/movie/:id', function (req, res) {
  let id = req.params.id;
  Movie.findById(id, function (err, movie) {
    res.render('detail', {
      title: '详情页',
      movie: movie
    });
  });

});
// admin 页面
router.get('/admin/movie', function (req, res) {
  res.render('admin', {
    title: 'admin页面',
    movie: {
      title: '',
      country: '',
      rating: '',
      director: '',
      language: '',
      year: '',
      description: '',
      flash: ''
    }

  });
});
// list 页面
router.get('/admin/list', function (req, res) {
  Movie.fetch(function (err, movies) {
    if (err) {
      console.log(err);
    }
    res.render('list', {
      title: 'list',
      movies: movies
    })
  })

});
router.post('/admin/movie/new', function (req, res) {
  let id = req.body.movie._id;
  let movieObj = req.body.movie;
  let _movie;
  if (!id) {
    _movie = new Movie({
      title: movieObj.title,
      description: movieObj.description,
      year: movieObj.year,
      rating: movieObj.rating,
      poster: movieObj.poster,
      flash: movieObj.flash,
      director: movieObj.director,
      country: movieObj.country
    });
    _movie.save(function (err, movie) {
      if (err) {
        console.log(err);
      }
      res.redirect('/movie/' + movie._id);
    });
  } else {
    Movie.findById(id, function (err, movie) {
      if (err) {
        console.log(err);
      }
      _movie = underScore.extend(movie, movieObj);
      _movie.save(function (err, movie) {
        if (err) {
          console.log(err);
        }
        res.redirect('/movie/' + movie._id);
      });
    });
  }
});
router.get('/admin/update/:id', function (req, res) {
  let id = req.params.id;
  if (id) {
    Movie.findById(id, function (err, movie) {
      res.render('admin', {
        title: '后台录入页',
        movie: movie
      });
    });
  }
});
router.delete('/admin/list', function (req, res) {
  let id = req.query.id;
  if (id) {
    Movie.remove({_id: id}, function (err) {
      if (err) {
        console.log(err);
      } else {
        res.json({
          success: 1
        })
      }
    })
  }
});
router.post('/user/signup', function (req, res) {
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

});
router.get('/admin/userlist', function (req, res) {
  User.fetch(function (err, users) {
    if (err) {
      console.log(err);
    }
    res.render('userlist', {
      title: 'userlist',
      users: users
    })
  })
});
router.post("/user/signin", function (req, res) {
  let userObj = req.body.user;
  User.findOne({username: userObj.username}, function (err, _user) {
    if (err) {
      console.log(err);
    }
    _user.comparePassword(userObj.password, function (err, match) {
      if (err) {
        console.log(err);
      }
      if (match) {
        req.session.user = _user;
        return res.redirect('/');
      } else {
        console.log('Password is not');
      }
    })
  });
});
// logout
router.get('/logout', function (req, res) {
  req.session.user = res.locals.user = '';
  res.redirect('/');
});
module.exports = router;
