let Movie = require('../models/movies');
let Comment = require('../models/comment');
let underScore = require('underscore');
exports.index = function (req, res) {
  console.log('1');
  Movie.fetch(function (err, movies) {
    if (err) {
      console.log(err);
    }
    res.render('index', {
      movies: movies,
      title: '首页'
    });
  });
};
//movie router1
// detail 页面
// get('/movie/:id',
exports.detail = function (req, res) {
  let id = req.params.id;
  Movie.findById(id, function (err, movie) {
    Comment
      .find({movie: id})
      .populate('from', 'username')
      .populate('reply.from  reply.to', 'username')
      .exec(function (err, comments) {
        res.render('detail', {
        title: '详情页',
        movie: movie,
        comments: comments
      });
    });
  });
};
// admin 页面  get('/admin/movie',
exports.admin = function (req, res) {
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
};

// list 页面get('/admin/list'
exports.list = function (req, res) {
  Movie.fetch(function (err, movies) {
    if (err) {
      console.log(err);
    }
    res.render('list', {
      title: 'list',
      movies: movies
    });
  });
};

// 添加新电影
// post('/admin/movie/new',
exports.new = function (req, res) {
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
};

// 更新电影
// get('/admin/update/:id',
exports.update = function (req, res) {
  let id = req.params.id;
  if (id) {
    Movie.findById(id, function (err, movie) {
      res.render('admin', {
        title: '后台录入页',
        movie: movie
      });
    });
  }
};
// 删除电影
//  delete('/admin/list',
exports.delete = function (req, res) {
  let id = req.query.id;
  if (id) {
    Movie.remove({_id: id}, function (err) {
      if (err) {
        console.log(err);
      } else {
        res.json({
          success: 1
        });
      }
    });
  }
};