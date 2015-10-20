var express = require('express');
var router = express.Router();
var tags = require(__modelpath + '/tags');




router.get('/query', function(req, res, next) {
    next();
}, function(req, res, next) {
    var obj = new tags();
    obj.query(function(success) {
        res.send(success);
    }, function(error) {
        res.send(error);
    });
});

router.get('/pageQuery', function(req, res, next) {
    next();
}, function(req, res, next) {
    var obj = new tags();
    obj.pagesize = req.query.pagesize;
    obj.pageindex = req.query.pageindex;
    obj.pageQuery(function(success) {
        res.send(success);
    }, function(error) {
        res.send(error);
    });
});

router.post('/insert', function(req, res, next) {
    if (!req.body.data) {
        return res.send({
            code: 1,
            msg: "name is null"
        });
    }
    next();
}, function(req, res, next) {
    var obj = new tags();
    obj.name = req.body.data;
    obj.insert(function(success) {
        res.send(success);
    }, function(error) {
        res.send(error);
    });
});


router.post('/remove', function(req, res, next) {
    next();
}, function(req, res, next) {
    var obj = new tags();
    obj.id = req.body.id;
    obj.remove(function(success) {
        res.send(success);
    }, function(error) {
        res.send(error);
    });
});


router.get('/get/:id', function(req, res, next) {
    next();
}, function(req, res, next) {
    var obj = new tags();
    obj.id = req.params.id;
    obj.get(function(success) {
        res.send(success);
    }, function(error) {
        res.send(error);
    });
});

router.post('/update', function(req, res, next) {
    next();
}, function(req, res, next) {
    var obj = new tags();
    obj.id = req.body.id;
    obj.name = req.body.name;
    obj.update(function(success) {
        res.send(success);
    }, function(error) {
        res.send(error);
    });
});


module.exports = router;