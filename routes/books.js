var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Book = require('../models/Book');
var User = require('../models/User');

function needAuth(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    req.flash('danger', '로그인이 필요합니다.');
    res.redirect('/signin');
  }
}

router.get('/', function(req,res,next){
        Book.find({}).sort('-createdAt').exec(function(err,books){
            if(err){
                return next(err);
            }
            res.render('books/index', {books: books});
        });
});

router.get('/:id', function(req, res, next) {
  Book.findById(req.params.id, function(err, book) {
    if (err) {
      return next(err);
    }
    book.read++; // 조회수 증가
    book.save();
    res.render('books/show', {book: book});
  });
}); //show

//조회수 
router.get('/:id', function(req, res, next) {
  Book.findById(req.params.id, function(err, book) {
    if (err) {
      return next(err);
    }
    book.read++; // 조회수 증가
    book.save();
    res.render('books/show', {book: book});
  });
}); //show

module.exports = router;