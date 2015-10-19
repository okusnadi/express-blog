global.__modelpath = __dirname + '/model';
var express = require('express');
var session = require('express-session')
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var csrf = require(__modelpath + '/libcsrf');
var auth = require(__modelpath + '/auth');
var app = express();


//app.set('view cache', false);


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use(session({
    secret: 'keyboard cat',
    cookie: {
        maxAge: 1000 * 60 * 20
    },
    resave: false,
    saveUninitialized: true
}))

app.use(express.static(path.join(__dirname, 'public')));

// app.use("/admin", auth([
//     "/admin/",
//     "/admin/root.html",
//     "/admin/login",
//     "/admin/login/",
//     "/admin/auth/TestloginSuccess",
//     "/admin/auth/TestloginFailed",
//     "/admin/auth/get",
//     "/admin/login/",
//     "/admin/auth/login.html"
// ], [
//     "/javascripts",
//     "/stylesheets"
// ]));

// app.use("/admin", csrf())

app.use('*', function(req, res, next) {
    res.setHeader('hdata', 1);
    next()
})

app.use('/admin/auth', require('./routes/admin/auth'))
app.use('/admin/tags', require('./routes/admin/tags'))
app.use('/admin/categories', require('./routes/admin/categories'))
app.use('/admin/articles', require('./routes/admin/articles'))


app.use('/tags2', require('./routes/admin/tags2'))

app.use('/admin/', express.static(__dirname + '/public/views/admin/'));

app.use('/ddd/', function(req, res, next) {
    res.send("ddd")
});
app.use(function(err, req, res, next) {
    res.send("error")
});



module.exports = app;