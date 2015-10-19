var mysql = require("mysql");
var pool = mysql.createPool({
    connectionLimit: 10,
    host: '192.168.18.14',
    port: '3306',
    user: 'root',
    password: '123',
    database: 'blog'
});

console.log("=================");

var fn = {};

fn.query = function(sql, callback) {
    pool.getConnection(function(err, conn) {
        if (err) {
            callback(err, null, null);
        } else {
            conn.query(sql, function(qerr, vals, fields) {
                //释放连接  
                conn.release();
                //事件驱动回调  
                callback(qerr, vals, fields);
            });
        }
    });
};









fn.Insert = function(sql, value, callback) {

    pool.getConnection(function(err, conn) {
        if (err) {
            callback(err, null, null);
        } else {
            conn.query(sql, value, function(qerr, vals, fields) {
                //释放连接  
                conn.release();
                //事件驱动回调  
                callback(qerr, vals, fields);
            });
        }
    });
};

fn.queryByWith = function(sql, value, callback) {

    pool.getConnection(function(err, conn) {
        if (err) {

            callback(err, null, null);
        } else {
            conn.query(sql, value, function(qerr, vals, fields) {
                //释放连接  
                conn.release();
                //事件驱动回调  
                callback(qerr, vals, fields);
            });
        }
    });
};
fn.queryBy = function(sql, value, callback) {

    pool.getConnection(function(err, conn) {
        if (err) {
            callback(err, null, null);
        } else {
            conn.query(sql, value, function(qerr, vals, fields) {
                //释放连接  
                conn.release();
                //事件驱动回调  
                callback(qerr, vals, fields);
            });
        }
    });
};


module.exports = fn;