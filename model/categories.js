var mysql = require("model/libmysql");
var sql = {
    insert: 'INSERT INTO categories(name, created_at,updated_at) VALUES(?,?,?)',
    update: 'update categories set name=?,updated_at=? where id=?',
    delete: 'delete from categories where id=?',
    queryById: 'select * from categories where id=?',
    queryAll: 'select * from categories'
};

exports.insert = function(value, callback) {
    mysql.Insert(sql.insert, value, callback);
};

exports.update = function(value, callback) {
    console.log(sql.update)
    console.log(value)
    mysql.queryByWith(sql.update, value, callback);
};

exports.delete = function(value, callback) {
    mysql.queryByWith(sql.delete, value, callback);
};

exports.queryById = function(value, callback) {
    mysql.queryBy(sql.queryById, value, callback);
};

exports.queryAll = function(callback) {
    mysql.query(sql.queryAll, callback);
};
