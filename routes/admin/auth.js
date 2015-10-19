var express = require('express');
var router = express.Router();
var util = require('util');
var user = require('model/user');


router.use(function(req, res, next) {
    next();
});

router.post('/login', function(req, res, next) {
    req.session.uid = "req.body.email";
    res.send("login ok")
});

router.post('/hasloggedPost1', function(req, res, next) {
    res.send("hasloggedPost1")
});
router.post('/hasloggedPost2', function(req, res, next) {
    res.send(req.csrfToken());
});
router.post('/TestloginSuccess', function(req, res, next) {
    req.auth.loginSuccess();
    res.send("loginSuccess");
});
router.post('/TestloginFailed', function(req, res, next) {
    req.auth.loginFailed();
    res.send("loginFailed");
});

router.get('/get', function(req, res, next) {
    console.log("end1111111111111111:" ,req.session.csrf)
    res.send(req.csrf.make())
});
router.get('/delete3', function(req, res, next) {
    //req.cookies.auth31 = "1";

    res.send(401, "login")
    res.send(req.mySession.key)
});
router.get('/delete', function(req, res, next) {
    //req.cookies.auth31 = "1";

    // console.log( res.cookies)  ;

    req.session.uid = undefined;
    res.cookie('auth', '0', {
        maxAge: 10 + (8 * 36000)
    });
    res.end("delete")


    // req.mySession.key = 'true';
    // res.setHeader('X-Seen-You', '11111111111111111111');
    //res.setHeader("Set-Cookie", ["type=ninja", "language=javascript"]);
    //req.session.visitCount = 1;
    //console.log(req)
    //.user  = "11"
    res.send(req.mySession.key)
});

// router.get('/', function(req, res, next) {
//     res.render('/views/auth/login', {
//         csrfToken: req.csrfToken()
//     })
// });

router.post('/', function(req, res, next) {
    user.queryByEmail(req.body.email, function(err, vals, fields) {
        if (err) {
            res.send(err);
        } else {
            if (vals.length == 0) {
                res.send("未知用户");
            } else if (req.body.password != vals.password) {
                res.render('auth/login', {
                    csrfToken: req.csrfToken(),
                    error: "密码错误"
                })
            } else {
                req.session.uid = req.body.email;
                //req.session.save();
                res.redirect('../admin/index');
            }
        }
    });
});


module.exports = router;