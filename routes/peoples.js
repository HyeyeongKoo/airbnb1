var express = require('express'),
    Host = require('../models/Host');
var router = express.Router();
var mongoose = require('mongoose');

router.get('/', function(req,res,next){
  Host.find({}).sort('-createdAt').exec(function(err,hosts){
    if(err){
        return next(err);
    }
    res.render('hosts/peopleindex', {hosts: hosts});
  });
});

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

module.exports = router;
