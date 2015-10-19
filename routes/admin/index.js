var express = require('express');
var router = express.Router();
var util = require('util');
var user = require('model/user');
var sidebar = [{
    name: "文章",
    url: "articles",
    active: true
}, {
    name: "分类",
    url: "",
    active: false
}, {
    name: "标签",
    url: "tags",
    active: false
}, {
    name: "评论",
    url: "",
    active: false
}, {
    name: "设置",
    url: "",
    active: false
}]

router.use(function(req, res, next) {
    console.log('Time1111111111:', Date.now());
    // if (req.session.uid == undefined) {
    //     res.redirect('../auth/');
    // } else {
    //     next();
    // }
    // req.session.uid = "test@admin";
     next();
});

router.get('/', function(req, res, next) {

    res.send("/")
});
router.get('/index', function(req, res, next) {

    res.render('admin/index', {
        user: req.session.uid,
        csrfToken: req.csrfToken(),
        title: "title",
        sidebar: sidebar,
        content: "content"
    })
});
router.get('/index2', function(req, res, next) {

    res.render('admin/index', {
        user: req.session.uid,
        csrfToken: req.csrfToken(),
        title: "title",
        sidebar: sidebar,
        content: "content"
    })
});



router.post('/logout', function(req, res, next) {
    req.session.uid = "";
    res.redirect('../auth/');

});


module.exports = router;