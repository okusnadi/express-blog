var mysqlhelper = require(__modelpath + "/libmysqlhelper");

var helper = new mysqlhelper();
helper.sql.insert = 'INSERT INTO tags(name, created_at) VALUES(:name,:created_at)';
helper.sql.update = 'update tags set name=:name, updated_at=:updated_at where id=:id';
helper.sql.remove = 'delete from tags where id=:id';
helper.sql.query = 'select * from tags';
helper.sql.get = 'select * from tags where id=:id';
helper.sql.pageQuery = 'select SQL_CALC_FOUND_ROWS * from tags \
    order by id desc LIMIT :pagestart,:pagesize';

function tags() {
    this.id;
    this.name;
    this.pagesize;
    this.pageindex;
}

tags.prototype.pageQuery = function(success, error) {

    helper.pageQuery({
        "pagesize": this.pagesize,
        "pageindex": this.pageindex
    }, success, error);
}

tags.prototype.query = function(success, error) {
    helper.query({
        "id": this.id
    }, success, error);
}

tags.prototype.get = function(success, error) {
    helper.get({
        "id": this.id
    }, success, error);
}

tags.prototype.remove = function(success, error) {
    helper.remove({
        "id": this.id
    }, success, error);
};

tags.prototype.insert = function(success, error) {
    helper.insert({
        "name": this.name
    }, success, error);
};

tags.prototype.update = function(success, error) {
    helper.update({
        "id": this.id,
        "name": this.name
    }, success, error);
};

module.exports = tags;