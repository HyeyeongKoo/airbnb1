var express = require('express'),
    todos = require('./todos'),
    User = require('../models/User');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.post('/', function(req, res, next) {
  res.render('/todos');
});

router.get('/signin', function(req, res, next) {
  res.render('signin');
});




router.use('/todos', todos);

module.exports = router;

