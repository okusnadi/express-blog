app.constant('articles_EVENTS', {
    select: 'articles-events-select',
    update: 'articles-events-update',
    remove: 'articles-events-remove',
    insert: 'articles-events-insert',
})

angular.module(config.angular.name).service('articles', function($http, articles_EVENTS) {
    var messages = $resource(
        "/articles/:id", {
            id: "@id",
        }, {
            remove: {
                method: "POST",
            },
            insert: {
                method: "POST",
                params: {
                    title: "@title",
                    content: "@content"
                }
            },
            update: {
                method: "POST",
                params: {
                    title: "@title",
                    content: "@content"
                }
            },
            select: {
                method: "GET"
            }
        }
    );
    $rootScope.$on(articles_EVENTS.sessionSuccess, function(event, msg) {
        console.log(articles_EVENTS.sessionSuccess)
        authsystem.login();
    });
    $rootScope.$on(articles_EVENTS.sessionFailed, function(event, msg) {
        console.log(articles_EVENTS.sessionFailed)
        authsystem.out();
    });
    $rootScope.$on(articles_EVENTS.tokenFailed, function(event, msg) {
        console.log(articles_EVENTS.tokenFailed)
        authsystem.out();
    });
    $rootScope.$on(articles_EVENTS.exemption, function(event, msg) {
        console.log(articles_EVENTS.exemption)
        authsystem.out();
    });
    $rootScope.$on(articles_EVENTS.changeToken, function(event, msg) {
        console.log(articles_EVENTS.changeToken, msg)
        if (msg) {
            $http.defaults.headers.post['csrf'] = msg;
        }
    });


    var self = this;
    this.user = {};
    this.user.title = String();
    this.user.content = String();
    this.user.event = articles_EVENTS.event;
    this.insert = function(title, content) {
        self.user.title = title;
        self.user.content = content;
        self.user.event = articles_EVENTS.insert;
    }
    this.remove = function(id) {
        self.user.event = articles_EVENTS.remove;
    }
    this.update = function(title, content) {
        self.user.title = title;
        self.user.content = content;
        self.user.event = articles_EVENTS.update;
    }
    this.save = function() {
        return $http.post(self.backendUrl + '/users', {
            user: self.user
        })
    }
});

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

angular.module(config.angular.name).service('articles', function($http) {
    var self = this;
    this.user = {};
    this.user.title = String();
    this.user.content = String();
    this.insert = function(title, content) {
        self.insert.title = title;
        self.insert.content = content;
    }
    this.delete = function(id) {
        delete user;
    }
    this.update = function(title, content) {
        self.insert.title = title;
        self.insert.content = content;
    }
    this.delete = function() {
        return $http.post(self.backendUrl + '/users', {
            user: self.user
        })
    }
    this.save = function() {
        return $http.post(self.backendUrl + '/users', {
            user: self.user
        })
    }
});