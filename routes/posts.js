var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Post = require('../models/Post');

router.get('/', function(req,res,next){
    console.log("*****************")
    if (req.session.name == 'host') {
        console.log("*********aaaaaaaaaaaa********")
        Post.find({}).sort('-createdAt').exec(function(err,posts){
            if(err){
                return next(err);
            }
            res.render('posts/hostindex', {posts: posts});
        });
    } else {
        console.log("**bbbbbbbbbbb***************")
        console.log(req.session.user_id)
        console.log(req.session.user)
        Post.find({}).sort('-createdAt').exec(function(err,posts){
            if(err){
                return next(err);
            }
            res.render('posts/index', {posts: posts});
        });
    }
}); //index

router.get('/new', function(req, res, next) {
  res.render('posts/edit', {post: {}});
}); //new

router.post('/', function(req, res, next){
    var post = new Post({
      title: req.body.title,
      email: req.body.email,
      password: req.body.password,
      content: req.body.content,
      read: req.body.read
    }); // title, email, password, content, read 저장
    
    post.save(function(err){  // 저장
        if(err){
            return next(err);
        }else {
        res.redirect('/posts');
    }
 });
}); //save

router.get('/:id/edit', function(req, res, next) {
  Post.findById(req.params.id, function(err, post) {
    if (err) {
      return next(err);
    }
    res.render('posts/edit', {post: post});
  });
}); //edit

router.delete('/:id', function(req, res, next) {
  Post.findOneAndRemove({_id: req.params.id}, function(err) {
    if (err) {
      return next(err);
    }
    res.redirect('/posts');
  });
}); //delete

router.get('/:id', function(req, res, next) {
  Post.findById(req.params.id, function(err, post) {
    if (err) {
      return next(err);
    }
    post.read++; // 조회수 증가
    post.save();
    res.render('posts/show', {post: post});
  });
}); //show

router.put('/:id', function(req, res, next){
    Post.findById(req.params.id, function(err, post) {
    if (err) {
      return next(err);
    }
    post.title=req.body.title; 
    post.content=req.body.content; 
    //title, content 변경내용 저장

    post.save(function(err){ // 변경사항 저장
        if(err){
            return next(err);
        }
        res.redirect('/posts');
    });
    });
}); //updated


module.exports=router;