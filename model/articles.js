var mysql = require("model/libmysql");
var sql = {
    insert: 'INSERT INTO articles(title, content, created_at,updated_at) VALUES(?,?,?,?)',
    update: 'update articles set title=?, content=?,updated_at=? where id=?',
    remove: 'delete from articles where id=?',
    queryById: 'select * from articles where id=?',
    queryAll: 'select * from articles order by id desc limit 10 '
};




exports.insert = function(value, callback) {
    mysql.Insert(sql.insert, value, callback);
};

exports.update = function(value, callback) {
    console.log(sql.update)
    console.log(value)
    mysql.queryByWith(sql.update, value, callback);
};

exports.remove = function(value, callback) {
    mysql.queryByWith(sql.remove, value, callback);
};

exports.queryById = function(value, callback) {
    mysql.queryBy(sql.queryById, value, callback);
};

exports.queryAll = function(callback) {
    mysql.query(sql.queryAll, callback);
};
