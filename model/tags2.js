var ORM = require("model/aorm");

var orm = new ORM();
orm.sql.insert = 'INSERT INTO tags(name, created_at) VALUES(:name,:created_at)';
orm.sql.update = 'update tags set name=:name, updated_at=:updated_at where id=:id';
orm.sql.remove = 'delete from tags where id=:id';
orm.sql.query = 'select * from tags';
orm.sql.get = 'select * from tags where id=:id';
orm.sql.pageQuery = 'select SQL_CALC_FOUND_ROWS * from tags order by id desc LIMIT :pagestart,:pagesize';

function tags() {
    this.id;
    this.name;
    this.pagesize;
    this.pageindex;
}

tags.prototype.pageQuery = function(success, error) {

    orm.pageQuery({
        "pagestart": (this.pageindex - 1) * this.pagesize,
        "pagesize": this.pagesize
    }, success, error);
}

tags.prototype.query = function(success, error) {
    orm.query({
        "id": this.id
    }, success, error);
}

tags.prototype.get = function(success, error) {
    orm.get({
        "id": this.id
    }, success, error);
}

tags.prototype.remove = function(success, error) {
    orm.remove({
        "id": this.id
    }, success, error);
};

tags.prototype.insert = function(success, error) {
    orm.insert({
        "id": this.id
    }, success, error);
};

tags.prototype.update = function(success, error) {
    orm.update({
        "id": this.id,
        "name": this.name
    }, success, error);
};

module.exports = tags;
