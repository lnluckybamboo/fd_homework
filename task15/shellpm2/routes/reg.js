var express = require('express'),
    router = express.Router(),
    User = require('../models/user.js'),
    crypto = require('crypto'),
    TITLE_REG = '注册';
var csrf = require('../util/csrf.js');


function checkToken(req, res, next) {
    //刷新token,如果token不存在，重新创建
    req.session.token = req.session.token ? req.session.token : csrf.createToken();
    if (req.session.token === req.body.access_Token) {
        console.log("token:" + req.session.token);
        console.log("access_Token:" + req.body['access_Token']);
        console.log("token验证通过");
        next();
    } else {
        console.log("token:" + req.session.token);
        console.log("access_Token:" + req.body['access_Token']);
        res.send('token验证失败');
        return;
    }
}

router.get('/', function(req, res) {
    req.session.token = csrf.createToken();
    console.log("reg in get");
    res.render('reg', { title: TITLE_REG, access_Token: req.session.token });
});

router.post('/', checkToken, function(req, res) {
    console.log("reg in post");
    var userName = req.body['txtUserName'],
        userPwd = req.body['txtUserPwd'],
        userRePwd = req.body['txtUserRePwd'],
        md5 = crypto.createHash('md5');

    userPwd = md5.update(userPwd).digest('hex');

    var newUser = new User({
        username: userName,
        userpass: userPwd
    });

    //检查用户名是否已经存在
    User.getUserNumByName(newUser.username, function(err, results) {

        if (results != null && results[0]['num'] > 0) {
            err = '用户名已存在';
        }

        if (err) {
            res.locals.error = err;
            res.render('reg', { title: TITLE_REG, access_Token: req.session.token });
            return;
        }

        newUser.save(function(err, result) {
            if (err) {
                res.locals.error = err;
                res.render('reg', { title: TITLE_REG, access_Token: req.session.token });
                return;
            }

            if (result.insertId > 0) {
                res.locals.success = '注册成功,请点击   <a class="btn btn-link" href="/login" role="button"> 登录 </a>';
            } else {
                res.locals.error = err;
            }

            res.render('reg', { title: TITLE_REG, access_Token: req.session.token });
        });
    });
});

module.exports = router;
