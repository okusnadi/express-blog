var express = require('express');
var router = express.Router();
var util = require('util');
var tags = require('model/tags');
var moment = require('moment');

router.use(function(req, res, next) {
    // console.log('Time:', Date.now());
    // if (req.session.uid == undefined) {
    //     res.redirect('../auth/');
    // } else {
         next();
    // }
});
router.get('/select', function(req, res, next) {

    tags.queryAll(function(err, vals, fields) {
        res.send(JSON.stringify(vals));
    });

});

router.get('/insert', function(req, res, next) {

    res.render('admin/tagsAdd', {
        user: req.session.uid,
        title: "title",
        content: "content"
    })
});

router.post('/insert', function(req, res, next) {

    var time = moment().format("YYYY-MM-DD HH:mm:ss");
    tags.insert(new Array(req.body.data, time, time), function(err, vals, fields) {
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
    // tags.queryById(req.params.id, function(err, vals, fields) {
    //     if (err)
    //         res.send(err);
    //     else {
    //         res.render('admin/tagsUpdate', {
    //             tags: JSON.stringify(vals)
    //         })
    //     }
    // });
    tags.queryById(req.params.id, function(err, vals, fields) {
        if (err)
            res.send(err);
        else {
            res.send(JSON.stringify(vals[0]));
        }
    });
});

router.post('/update', function(req, res, next) {
    var time = moment().format("YYYY-MM-DD HH:mm:ss");
    console.log('req.body.id', req.body.id);
    console.log('req.body.name', req.body.name);
    tags.update(new Array(req.body.name, time, req.body.id), function(err, vals, fields) {
        if (err) {
            console.log("/update--error", err);
            res.send(err);
        } else {
            console.log("/update--ok", vals);
            res.send(vals.affectedRows.toString());
        }
    });
});


router.post('/delete', function(req, res, next) {

    tags.delete(req.body.id, function(err, vals, fields) {
        if (err)
            res.send(err);
        else {
            res.send(vals.affectedRows.toString());
        }
    });
});

router.get('/delete', function(req, res, next) {
    res.send('/get:delete')
    // tags.queryAll(function(err, vals, fields)
    // {
    //     res.render('admin/tags', {
    //         user: req.session.uid,
    //         csrfToken: req.csrfToken(),
    //         title: "title",
    //         tags: vals,
    //         content: "content"
    //     })
    // });
});



module.exports = router;