let express = require('express');
let router = express.Router();
let underScore = require('underscore');
let userRoutes = require('./userRoutes');
let Movie = require('../models/movies');
// pre handle user
// router.use(userRoutes.getUser);

router.post('/login', userRoutes.login);
router.post('/signup', userRoutes.signup);
router.get('/logoum', userRoutes.logout);
router.get('/admin/userlist', userRoutes.userList);

router.get('/', function (req, res) {
  console.log('1');
  Movie.fetch(function (err, movies) {
    if (err) {
      console.log(err);
    }
    res.render('index', {
      movies: movies,
      title: '首页'
    })
  })
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

module.exports = router;
