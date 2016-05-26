// 实现与MySQL交互
var mysql = require('mysql');
var $conf = require('../conf/db');
var $sql = require('./newsSql');

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
    insert: function(req, res, next) {
        var param = req.body;
        if (param.newstitle == null || param.newstype == null || param.newsimg == null || param.newscontent == null || param.addtime == null) {
            jsonWrite(res, undefined);
            return;
        }

        pool.getConnection(function(err, connection) {
            connection.query($sql.insert, [param.newstitle, param.newstype, param.newsimg, param.newscontent, param.addtime], function(err, result) {
                if (result) {
                    result = {
                        code: 200,
                        msg: '增加成功'
                    };
                }
                jsonWrite(res, result);
                connection.release();
            });
        });
    },
    update: function(req, res, next) {
        // update by id
        var param = req.body;
        if (param.newsid == null || param.newstitle == null || param.newstype == null || param.newsimg == null || param.newscontent == null || param.addtime == null) {
            jsonWrite(res, undefined);
            return;
        }

        pool.getConnection(function(err, connection) {
            connection.query($sql.update, [param.newstitle, param.newstype, param.newsimg, param.newscontent, param.addtime, param.newsid], function(err, result) {
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
        // delete by Id
        pool.getConnection(function(err, connection) {
            var paramNewsid = req.body.newsid;
            if (paramNewsid == null) {
                jsonWrite(res, undefined);
                return;
            }
            connection.query($sql.delete, paramNewsid, function(err, result) {
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
