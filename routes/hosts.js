var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Host = require('../models/User');
var Host = require('../models/Host');

function needAuth(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    req.flash('danger', '로그인이 필요합니다.');
    res.redirect('/signin');
  }
}


router.get('/', function(req,res,next){
  Host.find({}).sort('-createdAt').exec(function(err,hosts){
    if(err){
        return next(err);
    }
    res.render('hosts/index', {hosts: hosts});
  });
});

router.get('/new', function(req, res, next) {
  res.render('hosts/edit', {host: {}});
}); //new

router.post('/', function(req, res, next){
    var host = new Host();
    host.user = req.body.user;
    host.city = req.body.city;
    host.title = req.body.title;
    host.price = req.body.price;
    host.people = req.body.people;
    host.read= req.body.read;
    host.intro = req.body.intro;
    
    host.save(function(err){  // 저장
        if(err){
            return next(err);
        }else {
        res.redirect('/hosts');
        }
 });
}); //save

router.get('/:id', function(req, res, next) {
  Host.findById(req.params.id, function(err, host) {
    if (err) {
      return next(err);
    }
    host.read++; // 조회수 증가
    host.save();
    res.render('hosts/show', {host: host});
  
  });
}); //show

router.get('/:id/edit', function(req, res, next) {
  Host.findById(req.params.id, function(err, host) {
    if (err) {
      return next(err);
    }
    res.render('hosts/edit', {host: host});
  });
}); //edit

router.delete('/:id', function(req, res, next) {
  Host.findOneAndRemove({_id: req.params.id}, function(err) {
    if (err) {
      return next(err);
    }
    res.redirect('/hosts');
  });
}); //delete

router.put('/:id', function(req, res, next) {
  Host.findById(req.params.id, function(err, host) {
      if(err) {
          return next(err);
      }

      host.city = req.body.city;
      host.title = req.body.title;
      host.price = req.body.price;
      host.people = req.body.people;
      host.intro = req.body.intro;

    host.save(function(err){ // 변경사항 저장
        if(err){
            return next(err);
        }
        res.redirect('/hosts');
    });
    });
}); //updated


module.exports = router;