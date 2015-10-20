var express = require('express');
var router = express.Router();
var mysql = require(__modelpath + '/libmysql');
var randomstring = require("randomstring");
var moment = require('moment');
router.get('/tags', function(req, res, next) {
    next();
}, function(req, res, next) {

    var sql = "INSERT INTO tags(name, created_at) VALUES ('" + randomstring.generate(7) + "','" + now + "')";
    var now = moment().format("YYYY-MM-DD HH:mm:ss");
    for (var i = 0; i < 200; i++) {
        sql += ",('" + randomstring.generate(7) + "','" + now + "')"

    };
    console.log(sql)

    mysql.remove("truncate tags;", [], function(success) {
        mysql.basetransaction(sql, [], function(success) {
            res.send(success);
        }, function(error) {
            res.send(error);
        });
    }, function(error) {
        res.send(error);
    });


});




module.exports = router;