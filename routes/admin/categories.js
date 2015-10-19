var express = require('express');
var router = express.Router();
var util = require('util');
var categories = require('model/categories');
var moment = require('moment');


router.get('/select', function(req, res, next) {
    categories.queryAll(function(err, vals, fields) {
        res.send(JSON.stringify(vals));
    });

});


router.post('/insert', function(req, res, next) {
    var time = moment().format("YYYY-MM-DD HH:mm:ss");
    categories.insert(new Array(req.body.data, time, time), function(err, vals, fields) {
        if (err)
            res.send(err);
        else {
            console.log(vals)
            var result = {};
            result.id = vals.insertId;
            result.name = req.body.data;
            result.created_at = time;
            result.updated_at = time;
            res.send(result);
        }
    });

});

router.get('/update/:id', function(req, res, next) {
    categories.queryById(req.params.id, function(err, vals, fields) {
        if (err)
            res.send(err);
        else {
            res.send(JSON.stringify(vals[0]));
        }
    });
});

router.post('/update', function(req, res, next) {
    var time = moment().format("YYYY-MM-DD HH:mm:ss");
    categories.update(new Array(req.body.name, time, req.body.id), function(err, vals, fields) {
        if (err) {
            res.send(err);
        } else {
            res.send(vals.affectedRows.toString());
        }
    });
});


router.post('/delete', function(req, res, next) {
    categories.delete(req.body.id, function(err, vals, fields) {
        if (err)
            res.send(err);
        else {
            res.send(vals.affectedRows.toString());
        }
    });
});


module.exports = router;