var crypto = require('crypto');

var csrfSystem = function(req, res) {
    this.req = req;
    this.res = res;
};

csrfSystem.prototype.make = function() {
    var now = (new Date()).valueOf().toString();
    var random = Math.random().toString();
    var token = crypto.createHash('md5').update(now + random).digest('hex');;
    this.req.session.csrf = token;
    return token;
}

csrfSystem.prototype.check = function() {
    if (this.req.method == "POST") {
        var session = this.req.session.csrf;
        var cookies = this.req.headers.csrf;

        console.log("session : ", session);
        console.log("cookies : ", cookies);
        if (!session || typeof session !== 'string' ||
            !cookies || typeof cookies !== 'string' ||
            cookies.length != 32 || session !== cookies) {
            return false;
        }
    }
    return true;
}


module.exports = function() {
    return function(req, res, next) {
        req.csrf = new csrfSystem(req, res);

        if (!req.csrf.check())
            return req.auth.csrfFailed();

        if (req.auth.csrf === true)
            req.csrf.make();

        res.setHeader('token', req.session.csrf);

        next();
    }
};