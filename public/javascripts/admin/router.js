app.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/");
    $stateProvider
        .state('root', {
            url: '',
            templateUrl: 'root.html',
            onEnter: function($state) {
                console.log("enter root")
            }
        })
        .state('root.home', {
            url: '/home',
            templateUrl: 'home/home.html',
            controller: "HomeController",
            resolve: {
                loadjs: function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: config.angular.name,
                        files: ['/javascripts/admin/controller/Home.js']
                    });
                }
            }

        })

    .state('root.home.articles', {
        url: '/articles',
        templateUrl: 'articles/index.html',
        controller: "articlesController",
        resolve: {
            loadjs: function($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name: config.angular.name,
                    files: [
                        '/javascripts/admin/controller/articles.js'
                    ]
                });
            }

        }
    })

    .state('root.home.tags', {
        url: '/tags',
        templateUrl: 'tags/index.html',
        controller: "tagsController",
        resolve: {
            loadjs: function($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name: config.angular.name,
                    files: ['/javascripts/admin/controller/tags.js']
                });
            }

        }
    })
    .state('root.home.tags.detail', {
        url: '/:id',
        templateUrl: 'tags/detail.html',
        controller: "tagsDetailController",
        resolve: {
            loadjs: function($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name: config.angular.name,
                    files: ['/javascripts/admin/controller/tagsDetail.js']
                });
            }

        }
    })
        .state('root.home.categories', {
            url: '/categories',
            templateUrl: 'categories/index.html',
            controller: "categoriesController",
            resolve: {
                loadjs: function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: config.angular.name,
                        files: ['/javascripts/admin/controller/categories.js']
                    });
                }

            }
        })
        .state('root.login', {
            url: '/login',
            templateUrl: 'auth/login.html',
            controller: "loginController",
            resolve: {
                loadjs: function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: config.angular.name,
                        files: ['/javascripts/admin/controller/login.js']
                    });
                }

            }
        })
        .state('root.haslogged', {
            url: '/haslogged',
            templateUrl: 'auth/haslogged.html',
            controller: "hasloggedController",
            resolve: {
                loadjs: function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: config.angular.name,
                        files: ['/javascripts/admin/controller/haslogged.js']
                    });
                }
            }
        })
        .state('root.root', {
            url: '/',
            templateUrl: 'views/blank.html',
            onEnter: function($state) {}
        })
});