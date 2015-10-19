var mysql = require("model/libmysql");
var sql = {
    insert: 'INSERT INTO users(id, name, age) VALUES(0,?,?)',
    update: 'update users set password=? where email=?',
    delete: 'delete from users where email=?',
    queryByEmail: 'select * from users where email=?',
    queryAll: 'select * from users'
};

exports.insert = function(callback) {
    mysql.query(sql.insert, callback);
};

exports.update = function(callback) {
    mysql.query(sql.update, callback);
};

exports.delete = function(callback) {
    mysql.query(sql.delete, callback);
};

exports.queryByEmail = function(value, callback) {
    mysql.queryBy(sql.queryByEmail, value, callback);
};

exports.queryAll = function(callback) {
    mysql.query(sql.queryAll, callback);
};


// exports.create = function create() {
//     var name = '';

//     this.setName = function(n) {
//         name = n;
//     };

//     this.printName = function() {
//         return name;
//     };
// };

//module.exports = user;