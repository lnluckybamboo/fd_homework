var express = require('express');
var router = express.Router();
var newsModel = require('../models/news');

// 全部查找
router.get('/queryAll', function(req, res, next) {
    newsModel.queryAll(req, res, next);
});

router.get('/queryByType', function(req, res, next) {
    newsModel.queryByType(req, res, next);
});

router.get('/queryById', function(req, res, next) {
    newsModel.queryById(req, res, next);
});

router.post('/insert', function(req, res, next) {
    newsModel.insert(req, res, next);
});

router.post('/update', function(req, res, next) {
    newsModel.update(req, res, next);
});

router.post('/delete', function(req, res, next) {
    newsModel.delete(req, res, next);
});

module.exports = router;