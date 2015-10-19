app.constant('SERVER_EVENTS', {
    sessionSuccess: 'server-events-session-success',
    sessionFailed: 'server-events-session-failed',
    tokenFailed: 'server-events-token-failed',
    exemption: 'server-events-exemption',
    changeToken: 'server-event-change-token',
    changeState: 'server-event-change-state'
})
app.run(function($rootScope, $http, $state, SERVER_EVENTS, authsystem) {
    $rootScope.$on(SERVER_EVENTS.sessionSuccess, function(event, msg) {
        console.log(SERVER_EVENTS.sessionSuccess)
        authsystem.login();
    });
    $rootScope.$on(SERVER_EVENTS.sessionFailed, function(event, msg) {
        console.log(SERVER_EVENTS.sessionFailed)
        authsystem.out();
    });
    $rootScope.$on(SERVER_EVENTS.tokenFailed, function(event, msg) {
        console.log(SERVER_EVENTS.tokenFailed)
        authsystem.out();
    });
    $rootScope.$on(SERVER_EVENTS.exemption, function(event, msg) {
        console.log(SERVER_EVENTS.exemption)
        authsystem.out();
    });
    $rootScope.$on(SERVER_EVENTS.changeToken, function(event, msg) {
        console.log(SERVER_EVENTS.changeToken, msg)
        if (msg) {
            $http.defaults.headers.post['csrf'] = msg;
        }
    });
    $rootScope.$on(SERVER_EVENTS.changeState, function(event, msg) {
        if (authsystem.status()) {
            if ($state.current.name == "root" ||
                $state.current.name == "root.login") {

                $state.go('root.home');
            }
        } else {
            if ($state.current.name != "root.login") {

                $state.go('root.login');
            }
        }
    });
})

app.constant('AUTH_EVENTS', {
    loginSuccess: 'auth-login-success',
    loginFailed: 'auth-login-failed',
    logoutSuccess: 'auth-logout-success',
    logoutFailed: 'auth-logout-failed'
})

app.run(function($rootScope, SERVER_EVENTS, AUTH_EVENTS) {
    $rootScope.$on(AUTH_EVENTS.loginSuccess, function(event, msg) {
        console.log(AUTH_EVENTS.loginSuccess)
        $rootScope.$emit(SERVER_EVENTS.sessionSuccess, msg);
    });
    $rootScope.$on(AUTH_EVENTS.loginFailed, function(event, msg) {
        console.log(AUTH_EVENTS.loginFailed)
        $rootScope.$emit(SERVER_EVENTS.sessionFailed, msg);
    });
    $rootScope.$on(AUTH_EVENTS.logoutSuccess, function(event, msg) {
        console.log(AUTH_EVENTS.logoutSuccess)
        $rootScope.$emit(SERVER_EVENTS.sessionFailed, msg);
    });
    $rootScope.$on(AUTH_EVENTS.logoutFailed, function(event, msg) {
        console.log(AUTH_EVENTS.logoutFailed)
        $rootScope.$emit(SERVER_EVENTS.sessionFailed, msg);
    });
})

app.constant('SERVER_Response_Unknown', {
    s200: 'server-response-unknown-s200',
    s401: 'server-response-unknown-s401',
    s404: 'server-response-unknown-s404'
})

app.run(function($rootScope, SERVER_Response_Unknown) {
    $rootScope.$on(SERVER_Response_Unknown.s200, function(event, msg) {
        console.log(SERVER_Response_Unknown.s200, msg)
    });
    $rootScope.$on(SERVER_Response_Unknown.s401, function(event, msg) {
        console.log(SERVER_Response_Unknown.s401, msg)
    });
    $rootScope.$on(SERVER_Response_Unknown.s404, function(event, msg) {
        console.log(SERVER_Response_Unknown.s404, msg)
    });
})

app.constant('SERVER_Response', {
    s200: 'server-response-s200',
    s304: 'server-response-s304',
    s401: 'server-response-s401',
    s404: 'server-response-s404',
    all: 'server-response-all'
})

app.run(function($rootScope,
    SERVER_Response,
    SERVER_Response_Unknown,
    SERVER_EVENTS,
    AUTH_EVENTS) {
    $rootScope.$on(SERVER_Response.s401, function(event, hdata, token) {
        if (false) {;
        } else if (hdata == "0") {
            $rootScope.$emit(SERVER_EVENTS.sessionFailed, null);
        } else if (hdata == "1") {
            $rootScope.$emit(SERVER_EVENTS.sessionSuccess, null);
        } else if (hdata == "5") {
            $rootScope.$emit(SERVER_EVENTS.tokenFailed, null);
        } else if (hdata == "9") {
            $rootScope.$emit(SERVER_EVENTS.exemption, null);
        } else if (hdata == "11") {
            $rootScope.$emit(AUTH_EVENTS.loginSuccess, null);
        } else if (hdata == "12") {
            $rootScope.$emit(AUTH_EVENTS.loginFailed, null);
        } else if (hdata == "13") {
            $rootScope.$emit(AUTH_EVENTS.logoutFailed, null);
        } else {
            $rootScope.$emit(SERVER_Response_Unknown.s401, null);
        }
        $rootScope.$emit(SERVER_EVENTS.changeToken, token);
        $rootScope.$emit(SERVER_EVENTS.changeState, null);
    });

    $rootScope.$on(SERVER_Response.s200, function(event, hdata, token) {
        if (false) {;
        } else if (hdata == "1") {
            $rootScope.$emit(SERVER_EVENTS.sessionSuccess, null);
        } else {
            $rootScope.$emit(SERVER_Response_Unknown.s200, null);
        }
        $rootScope.$emit(SERVER_EVENTS.changeToken, token);
        $rootScope.$emit(SERVER_EVENTS.changeState, null);
    });

    $rootScope.$on(SERVER_Response.s304, function(event, hdata, token) {
        $rootScope.$emit(SERVER_Response.s200, hdata, token);
    });

    $rootScope.$on(SERVER_Response.s404, function(event, hdata, token) {
        $rootScope.$emit(SERVER_EVENTS.changeToken, token);
        $rootScope.$emit(SERVER_EVENTS.changeState, null);
    });

    $rootScope.$on(SERVER_Response.all, function(event, status, hdata, token) {
        console.log("status [%s] hdata [%s]", status, hdata)
        if (false) {;
        } else if (status == 200) {
            $rootScope.$emit(SERVER_Response.s200, hdata, token);
        } else if (status == 304) {
            $rootScope.$emit(SERVER_Response.s304, hdata, token);
        } else if (status == 401) {
            $rootScope.$emit(SERVER_Response.s401, hdata, token);
        } else if (status == 404) {
            $rootScope.$emit(SERVER_Response.s404, hdata, token);
        } else {}
    });
})





app.controller('ApplicationController', function($rootScope, $state, $http) {


});