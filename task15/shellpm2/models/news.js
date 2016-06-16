// 实现与MySQL交互
var mysql = require('mysql');
var $conf = require('../conf/db');
var $sql = require('./newsSql');
var xss = require('../util/xss');

// 使用连接池，提升性能
var pool = mysql.createPool($conf.mysql);

// 向前台返回JSON方法的简单封装
var jsonWrite = function(res, ret) {
    if (typeof ret === 'undefined') {
        res.json({
            code: '1',
            msg: '操作失败'
        });
    } else {
        res.json(ret);
    }
};

module.exports = {
    queryAll: function(req, res, next) {
        pool.getConnection(function(err, connection) {
            connection.query($sql.queryAll, function(err, result) {
                jsonWrite(res, result);
                connection.release();
            });
        });
    },
    queryByType: function(req, res, next) {
        var param = req.query;
        if (param.newstype == null || param.last == null || param.amout == null) {
            jsonWrite(res, undefined);
            return;
        }
        pool.getConnection(function(err, connection) {
            connection.query($sql.queryByType, [param.newstype, parseInt(param.last), parseInt(param.amout)], function(err, result) {
                jsonWrite(res, result);
                connection.release();

            });
        });
    },
    queryById: function(req, res, next) {
        var param = req.query;
        if (param.newsid == null) {
            jsonWrite(res, undefined);
            return;
        }
        pool.getConnection(function(err, connection) {
            connection.query($sql.queryById, [parseInt(param.newsid)], function(err, result) {
                jsonWrite(res, result);
                connection.release();
            });
        });
    },
    insert: function(req, res, next) {
        var param = req.body;
        if (param.newstitle == null || param.newstype == null || param.newsimg == null || param.newscontent == null || param.addtime == null) {
            jsonWrite(res, undefined);
            return;
        }

        pool.getConnection(function(err, connection) {
            connection.query($sql.insert, [
                xss.html_encode(decodeURIComponent(param.newstitle)),
                xss.html_encode(decodeURIComponent(param.newstype)),
                xss.html_encode(decodeURIComponent(param.newsimg)),
                xss.html_encode(decodeURIComponent(param.newscontent)),
                xss.html_encode(decodeURIComponent(param.addtime))
            ], function(err, result) {
                if (result) {
                    result = {
                        code: 200,
                        insertId: result.insertId,
                        msg: "新增成功"
                    };
                }
                jsonWrite(res, result);
                connection.release();
            });
        });
    },
    update: function(req, res, next) {
        var param = req.body;
        if (param.newsid == null || param.newstitle == null || param.newstype == null || param.newsimg == null || param.newscontent == null || param.addtime == null) {
            jsonWrite(res, undefined);
            return;
        }

        pool.getConnection(function(err, connection) {
            connection.query($sql.update, [
                xss.html_encode(decodeURIComponent(param.newstitle)),
                xss.html_encode(decodeURIComponent(param.newstype)),
                xss.html_encode(decodeURIComponent(param.newsimg)),
                xss.html_encode(decodeURIComponent(param.newscontent)),
                xss.html_encode(decodeURIComponent(param.addtime)),
                xss.html_encode(decodeURIComponent(param.newsid))
            ], function(err, result) {
                if (result.affectedRows > 0) {
                    result = {
                        code: 200,
                        msg: '修改成功'
                    };
                } else {
                    result = void 0;
                }
                jsonWrite(res, result);
                connection.release();
            });
        });
    },
    delete: function(req, res, next) {
        pool.getConnection(function(err, connection) {
            var paramNewsid = req.body.newsid;
            if (paramNewsid == null) {
                jsonWrite(res, undefined);
                return;
            }
            connection.query($sql.delete, xss.html_encode(decodeURIComponent(paramNewsid)), function(err, result) {
                if (result.affectedRows > 0) {
                    result = {
                        code: 200,
                        msg: '删除成功'
                    };
                } else {
                    result = void 0;
                }
                jsonWrite(res, result);
                connection.release();
            });
        });
    }
};
