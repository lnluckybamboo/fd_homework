var express = require('express'),
    router = express.Router();

router.get('/', function(req, res) {
	res.clearCookie('islogin');
    req.session.destroy();
    res.redirect('/login');
});

module.exports = router;
