var express = require('express');
var router = express.Router();
var tags = require(__modelpath + '/tags');



router.get('/query', function(req, res, next) {
    var obj = new tags();
    obj.query(function(success) {
        res.send(success);
    }, function(error) {
        res.send(error);
    });
});

router.get('/pageQuery', function(req, res, next) {
    var obj = new tags();
    obj.pagesize = 5;
    obj.pageindex = 1;
    obj.pageQuery(function(success) {
        res.send(success);
    }, function(error) {
        res.send(error);
    });
});


router.post('/insert', function(req, res, next) {
    var obj = new tags();
    obj.name = req.body.data;
    obj.insert(function(success) {
        res.send(success);
    }, function(error) {
        res.send(error);
    });
});


router.post('/remove', function(req, res, next) {
    var obj = new tags();
    obj.id = req.body.id;
    obj.remove(function(success) {
        res.send(success);
    }, function(error) {
        res.send(error);
    });
});




router.get('/get/:id', function(req, res, next) {
    var obj = new tags();
    obj.id = req.params.id;
    obj.get(function(success) {
        res.send(success);
    }, function(error) {
        res.send(error);
    });
});

router.post('/update', function(req, res, next) {
    var obj = new tags();
    obj.id = req.body.id;
    obj.name = req.body.name;
    obj.update(function(success) {
        console.log(success)
        res.send(success);
    }, function(error) {
        res.send(error);
    });


    // var time = moment().format("YYYY-MM-DD HH:mm:ss");
    // console.log('req.body.id', req.body.id);
    // console.log('req.body.name', req.body.name);
    // tags.update(new Array(req.body.name, time, req.body.id), function(err, vals, fields) {
    //     if (err) {
    //         console.log("/update--error", err);
    //         res.send(err);
    //     } else {
    //         console.log("/update--ok", vals);
    //         res.send(vals.affectedRows.toString());
    //     }
    // });
});



module.exports = router;