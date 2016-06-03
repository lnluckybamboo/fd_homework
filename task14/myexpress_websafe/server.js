var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var routes = require('./routes/index');
var reg = require('./routes/reg');
var login = require('./routes/login');
var logout = require('./routes/logout');
var news = require('./routes/news');
var mobilenews = require('./routes/mobilenews');
// var csrf = require('./util/csrf.js');
var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// 开启cookie
app.use(cookieParser());
//开启session
app.use(session({ secret: 'hello_csrf', name: "token" }));

app.use('/', routes); //数据库管理界面
app.use('/reg', reg); //注册页面
app.use('/login', login); //登录界面
app.use('/logout', logout);
app.use('/news', news);
app.use('/mobilenews', mobilenews); //手机百度新闻页面

app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});



var server = app.listen(8081, function() {

    var host = server.address().address
    var port = server.address().port

    console.log("应用实例，访问地址为 http://%s:%s", host, port)

})
