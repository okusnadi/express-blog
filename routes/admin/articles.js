var express = require('express');
var router = express.Router();
var util = require('util');
var articles = require('model/articles');
var moment = require('moment');


router.get('/select', function(req, res, next) {
    articles.queryAll(function(err, vals, fields) {
        res.send(JSON.stringify(vals));
    });

});


router.post('/insert', function(req, res, next) {
    var time = moment().format("YYYY-MM-DD HH:mm:ss");
    articles.insert(new Array(req.body.title, req.body.content, time, time), function(err, vals, fields) {
        if (err)
            res.send(err);
        else {
            console.log(vals)
            var result = {};
            result.id = vals.insertId;
            res.send(result);
        }
    });

});

router.get('/update/:id', function(req, res, next) {
    articles.queryById(req.params.id, function(err, vals, fields) {
        if (err)
            res.send(err);
        else {
            res.send(JSON.stringify(vals[0]));
        }
    });
});

router.post('/update', function(req, res, next) {
    var time = moment().format("YYYY-MM-DD HH:mm:ss");
    articles.update(new Array(req.body.title, req.body.content, time, req.body.id), function(err, vals, fields) {
        if (err) {
            res.send(err);
        } else {
            res.send(vals.affectedRows.toString());
        }
    });
});


router.post('/delete', function(req, res, next) {
    articles.delete(req.body.id, function(err, vals, fields) {
        if (err)
            res.send(err);
        else {
            res.send(vals.affectedRows.toString());
        }
    });
});


module.exports = router;