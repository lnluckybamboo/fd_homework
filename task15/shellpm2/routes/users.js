var express = require('express');
var router = express.Router();
var userDao = require('../dao/userDao');

// 增加用户
router.get('/addUser', function(req, res, next) {
    userDao.add(req, res, next);
});

// 查找用户
router.get('/queryUser', function(req, res, next) {
    userDao.queryById(req, res, next);
});

module.exports = router;