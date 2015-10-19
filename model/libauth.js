var AuthSystem = function(req, res, next) {
    this.req = req;
    this.res = res;
    this.csrf = false;
};

AuthSystem.prototype.setHeader = function(status, hdata, csrf) {
    this.res.status(status);
    this.res.setHeader('hdata', hdata);
    this.csrf = csrf;
}

AuthSystem.prototype.check = function() {
    return this.req.session.auth === true;
}

AuthSystem.prototype.loginSuccess = function() {
    this.req.session.auth = true;
    this.setHeader(401, 11, true);
    console.log("login Success")
}

AuthSystem.prototype.loginFailed = function() {
    this.req.session.auth = false;
    this.setHeader(401, 12, true);
    console.log("login Failed")
}

AuthSystem.prototype.loginOut = function() {
    this.req.session.auth = false;
    this.setHeader(401, 13, true);
    console.log("login Out")
}


AuthSystem.prototype.sessionFailed = function() {

    this.setHeader(401, 0, true);
    this.res.send("session Failed");
    console.log("session Failed")
}

AuthSystem.prototype.sessionSuccess = function() {
    this.setHeader(200, 1, false);
    console.log(this.req.originalUrl.toString())
    //console.log("%s %s", this.req.originalUrl.toString(), "session Success")
}


AuthSystem.prototype.csrfFailed = function() {
    this.setHeader(401, 5, true);
    this.res.send("csrf Failed");
    console.log("csrf Failed")
}

AuthSystem.prototype.allowPage = function() {
    this.setHeader(401, 9, true);
    console.log("allow Page")
}


AuthSystem.prototype.isInArray = function(array, val) {
    for (var i = array.length - 1; i >= 0; i--) {
        if (array[i] == val) {
            return true;
        }
    };
    return false;
}

AuthSystem.prototype.indexOfArray = function(array, val) {
    for (var i = array.length - 1; i >= 0; i--) {
        if (val.indexOf(array[i]) == 0) {
            return true;
        }
    };
    return false;
}

module.exports = function(allowPage, excludeUrl) {
    return function(req, res, next) {

        req.auth = new AuthSystem(req, res, next);

        if (!req.auth.indexOfArray(excludeUrl, req.originalUrl.toString())) {

            if (req.auth.check()) {
                req.auth.sessionSuccess();
                return next();
            }

            if (req.auth.isInArray(allowPage, req.originalUrl.toString())) {
                req.auth.allowPage();
                return next();
            }
            req.auth.sessionFailed();
        }
        else
        {
            next();
        }
    }
}