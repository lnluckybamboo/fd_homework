var express = require('express'),
    router = express.Router();

router.get('/', function(req, res) {


    if (req.cookies.islogin) {
        console.log('index.js-----cookies:' + req.cookies.islogin);
        req.session.username = req.cookies.islogin;
    }

    if (req.session.username) {
        console.log('index.js-----session:' + req.session.username);
        res.locals.username = req.session.username;
    } else {
        res.redirect('/login');
        return;
    }
    
    res.render('index', { title: '主页'});
});

module.exports = router;
