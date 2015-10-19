var mysql = require("model/amysql");
var moment = require('moment');

function orm() {
    this.sql = {};
    this.sql.insert = String();
    this.sql.update = String();
    this.sql.remove = String();
    this.sql.get = String();
    this.sql.query = String();
    this.sql.pageQuery = String();
    this.sql.pageRows = 'select found_rows() as rows;';
}

orm.prototype.pageQuery = function(data, success, error) {
    var self = this;
    mysql.query(self.sql.pageQuery, data, function(success1) {
        mysql.pagerows(self.sql.pageRows, [], function(success2) {
            success(Array(success1, success2));
        }, function(error2) {
            error(error2);
        });
    }, function(error1) {
        error(error1);
    });
};

orm.prototype.query = function(data, success, error) {
    mysql.query(this.sql.query, data, success, error);
};

orm.prototype.get = function(data, success, error) {
    mysql.query(this.sql.get, data, success, error);
};

orm.prototype.remove = function(data, success, error) {
    mysql.query(this.sql.remove, data, success, error);
};

orm.prototype.insert = function(data, success, error) {
    data.created_at = moment().format("YYYY-MM-DD HH:mm:ss");
    mysql.query(this.sql.insert, data, function(result) {
        result.created_at = data.created_at;
        success(result);
    }, error);
};

orm.prototype.update = function(data, success, error) {
    data.updated_at = moment().format("YYYY-MM-DD HH:mm:ss");
    mysql.query(this.sql.update, data, function(result) {
        result.updated_at = data.updated_at;
        success(result);
    }, error);
};

module.exports = orm;