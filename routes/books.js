var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Book = require('../models/Book');

router.get('/', function(req,res,next){
        Book.find({}).sort('-createdAt').exec(function(err,books){
            if(err){
                return next(err);
            }
            res.render('books/index', {books: books});
        });
});

router.get('/new', function(req, res, next) {
  res.render('books/edit', {book: {}});
}); //new

router.post('/', function(req, res, next){
    var book = new Book();
    book.user = req.body.user;
    book.city = req.body.city;
    book.title = req.body.title;
    book.price = req.body.price;
    book.people = req.body.people;
    book.read= req.body.read;
    book.intro = req.body.intro;
    
    book.save(function(err){  // 저장
        if(err){
            return next(err);
        }else {
        res.redirect('/books');
        }
 });
}); //save

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

router.get('/:id/edit', function(req, res, next) {
  Book.findById(req.params.id, function(err, book) {
    if (err) {
      return next(err);
    }
    res.render('books/edit', {book: book});
  });
}); //edit

router.delete('/:id', function(req, res, next) {
  Book.findOneAndRemove({_id: req.params.id}, function(err) {
    if (err) {
      return next(err);
    }
    res.redirect('/books');
  });
}); //delete

router.put('/:id', function(req, res, next) {
  Book.findById(req.params.id, function(err, book) {
      if(err) {
          return next(err);
      }
      
      book.city = req.body.city;
      book.title = req.body.title;
      book.price = req.body.price;
      book.people = req.body.people;
      book.intro = req.body.intro;

    book.save(function(err){ // 변경사항 저장
        if(err){
            return next(err);
        }
        res.redirect('/books');
    });
    });
}); //updated

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