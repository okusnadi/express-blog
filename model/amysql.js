var mysql = require("mysql");

var pool = mysql.createPool({
    connectionLimit: 10,
    host: '192.168.18.14',
    port: '3306',
    user: 'root',
    password: '123',
    database: 'blog',
    queryFormat: function(query, values) {
        if (!values) return query;
        return query.replace(/\:(\w+)/g, function(txt, key) {
            if (values.hasOwnProperty(key)) {
                return this.escape(values[key]);
            }
            return txt;
        }.bind(this));
    }
});

console.log("mysql pool start");

exports.base = function(sql, data, success, error) {
    pool.getConnection(function(err, conn) {
        if (err) {
            error(err);
        } else {
            conn.query(sql, data, function(qerr, qvals, qfields) {
                conn.release();
                if (qerr) {
                    error(qerr);
                } else {
                    success(qvals);
                }
            });
        }
    });
};


exports.query = function(sql, data, success, error) {
    this.base(sql, data, function(qvals) {
        success(qvals);
    }, error);
};

exports.pagerows = function(sql, data, success, error) {
    this.base(sql, data, function(qvals) {
        success(qvals[0]);
    }, error);
};


exports.get = function(sql, data, success, error) {
    this.base(sql, data, function(qvals) {
        if (qvals.count > 0) {
            success(qvals[0]);
        } else {
            success({});
        }
    }, error);
};


exports.remove = function(sql, data, success, error) {
    this.base(sql, data, function(qvals) {
        success({
            affected_rows: qvals.affectedRows
        });
    }, error);
};


exports.insert = function(sql, data, success, error) {
    this.base(sql, data, function(qvals) {
        success({
            insert_id: qvals.insertId
        });
    }, error);
};


exports.update = function(sql, data, success, error) {
    this.base(sql, data, function(qvals, qfields) {
        success({
            affected_rows: qvals.affectedRows
        });
    }, error);
};