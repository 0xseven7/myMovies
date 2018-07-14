let Movie = require('../models/movies');
let Catetory = require('../models/catetory');

let _ = require('underscore');


exports.new = function (req, res) {
  res.render('catetoryadmin', {
    title: '后台录入页'
  })
};
// admin post catetory
exports.save = function (req, res) {
  let _catetory = req.body.catetory;
  let catetory = new Catetory(_catetory);

  catetory.save(function (err, catetory) {
    if (err) {
      return console.log(err);
    }
    res.redirect('/admin/catetorylist')
  })
};
exports.list = function (req, res) {
  Catetory.fetch(function (err, catetories) {
    if (err) {
      return console.log(err);
    }
    res.render('catetorylist', {
      catetoties: catetories,
      title: '分类列表页'
    })
  })
};