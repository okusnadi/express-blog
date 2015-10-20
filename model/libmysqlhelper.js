var mysql = require(__modelpath + "/libmysql");
var moment = require('moment');

function mysqlhelper() {
    this.sql = {};
    this.sql.insert = String();
    this.sql.update = String();
    this.sql.remove = String();
    this.sql.get = String();
    this.sql.query = String();
    this.sql.pageQuery = String();
    this.sql.pageRows = 'select found_rows() as rows;';
}

mysqlhelper.prototype.pageQuery = function(data, success, error) {

    if (data.pageindex == undefined ||
        data.pageindex < 1) {
        data.pageindex = 1;
    }
    if (data.pagesize == undefined ||
        data.pagesize < 1) {
        data.pagesize = 15;
    }
    if (data.pagesize == undefined ||
        data.pagesize > 15) {
        data.pagesize = 15;
    }

    data.pagestart = (data.pageindex - 1) * data.pagesize,
    data.pagesize = data.pagesize;

    var self = this;
    mysql.query(self.sql.pageQuery, data, function(success1) {
        mysql.pagerows(self.sql.pageRows, [], function(success2) {
            success2.pageindex = data.pageindex;
            success(Array(success1, success2));
        }, function(error2) {
            error(error2);
        });
    }, function(error1) {
        error(error1);
    });
};

mysqlhelper.prototype.query = function(data, success, error) {
    mysql.query(this.sql.query, data, success, error);
};

mysqlhelper.prototype.get = function(data, success, error) {
    mysql.get(this.sql.get, data, success, error);
};

mysqlhelper.prototype.remove = function(data, success, error) {
    mysql.remove(this.sql.remove, data, success, error);
};

mysqlhelper.prototype.insert = function(data, success, error) {
    data.created_at = moment().format("YYYY-MM-DD HH:mm:ss");
    mysql.insert(this.sql.insert, data, function(result) {
        result.created_at = data.created_at;
        success(result);
    }, error);
};

mysqlhelper.prototype.update = function(data, success, error) {
    data.updated_at = moment().format("YYYY-MM-DD HH:mm:ss");
    mysql.update(this.sql.update, data, function(result) {
        result.updated_at = data.updated_at;
        success(result);
    }, error);
};

module.exports = mysqlhelper;