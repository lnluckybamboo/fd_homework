var express = require('express');
var router = express.Router();
// var newsModel = require('../models/news');

// 全部查找
router.get('/', function(req, res, next) {
    // res.send('<h1>Hello World!</h1>');
    // newsModel.queryAll(req, res, next);
    res.render('mobilenews', { title: '百度新闻' });
});

module.exports = router;
