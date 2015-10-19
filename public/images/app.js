// angular.module('routeApp', ['ui.router', 'ui.router.stateHelper'])
//     .config(function(stateHelperProvider, $urlRouterProvider){
//     // $urlRouterProvider.otherwise("/contacts");

//         stateHelperProvider.state({
//             name: 'root',
//             templateUrl: 'root.html',
//             children: [
//                 {
//                     name: 'contacts',
//                     templateUrl: 'root-1.html'
//                 }
//             ]
//         }, { keepOriginalNames: true });
//     });




// var app = angular.module('routeApp', ['ui.router', 'ui.router.stateHelper']);
var app = angular.module('routeApp', ['ui.router']);
app.run(function($q, $rootScope, $state, $http) {
    $rootScope.$on('$stateChangeStart',
        function(event, toState, toParams, fromState, fromParams) {
            $state.current = toState;
        }
    )
})
app.controller('rootCtrl', function($rootScope) {});
app.controller('root1Ctrl', function($rootScope) {});
app.controller('root2Ctrl', function($rootScope) {});
app.controller('root3Ctrl', function($rootScope) {});

app.controller('MainCtrl', function($state) {
    //$state.go('admin');
})
var count = 0;
app.config(function($stateProvider, $urlRouterProvider) {

    // $urlRouterProvider.when("", "/");
    // $urlRouterProvider.when("/", "/");
    // $urlRouterProvider.when("", function()
    //   {
    //     console.log('$urlRouterProvider.when(""');
    //   });

    // $urlRouterProvider.when("/", function()
    //   {
    //     console.log('$urlRouterProvider.when("/"');
    //   });

      $urlRouterProvider.otherwise("/");
      $stateProvider.state('root', {
          url: '',
          templateUrl: 'root.html',
          onEnter: function($state) {
              // console.log("$state.current.name", $state.current.name);
              // if ($state.current.name == "root") {
              //     $state.go("root.home")
              // }
          }
      })
        .state('root.login', {
            url: '/login',
            templateUrl: 'views/login.html',
            onEnter: function() {
                console.log("enter root.login");
            }
        })
        .state('root.home', {
            url: '/home',
            templateUrl: 'views/home.html',
            onEnter: function() {
                console.log("enter root.home");
            }
        })
        .state('root.haslogin', {
            url: '/haslogin',
            templateUrl: 'views/haslogin.html',
            onEnter: function() {
                console.log("enter root.haslogin");
            }
        })
        .state('root.root', {
            url: '/',
            templateUrl: 'views/blank.html',
            onEnter: function($state) {
                // console.log("enter admin.admin");
                // if ($state.current.name == "root.root") {
                //     $state.go("root.home")
                // }

            }
        })
    // .state('contacts.detail', {
    //     url: '/:id',
    //     // loaded into ui-view of parent's template
    //     templateUrl: 'contacts.detail.html',
    //     controller: function($scope, $stateParams){
    //       $scope.person = $scope.contacts[$stateParams.id];
    //     },
    //     onEnter: function(){
    //       console.log("enter contacts.detail");
    //     }
    // })


    // var contacts = { 
    //     name: 'contacts',  //mandatory
    //     templateUrl: 'root.html'
    // }
    // var contactsList = { 
    //     name: 'contacts.list', //mandatory. This counter-intuitive requirement addressed in issue #368
    //     parent: contacts,  //mandatory
    //     templateUrl: 'root-1.html'
    // }

    // $stateProvider
    //     .state(contacts)
    //     .state(contactsList)
    // .state('root', {
    //     url: "/root",
    //     templateUrl: 'index.html'
    // })
    // .state('root.page1', {
    //     url: "/root/page1",
    //     templateUrl: 'root-1.html'
    // })
    // .state('rootpage2', {
    //     url: "/root",
    //     templateUrl: 'root-2.html'
    // })


    // .state('root.home', {
    //     url: "/home",
    //     templateUrl: 'home.html',
    //     controller: 'homeCtrl',
    //     resolve: {
    //         auth: function(AuthResolver) {
    //             return AuthResolver.resolve();
    //         }
    //     }
    // })
    // .state('root.login', {
    //     url: "/login",
    //     templateUrl: 'auth/login.html',
    //     controller: 'loginCtrl',
    //     resolve: {
    //         auth: function(AuthHasLogin) {
    //             return AuthHasLogin.resolve();
    //         }
    //     }
    // })
    // .state('root.haslogged', {
    //     url: "/haslogged",
    //     templateUrl: 'haslogged.html',
    //     controller: 'hasloggedCtrl',
    //     resolve: {
    //         auth: function(AuthResolver) {
    //             return AuthResolver.resolve();
    //         }
    //     }
    // })
    // .state('uiviewsidebar', {
    //     url: "/uiviewsidebar",
    //     templateUrl: 'template/sidebar.html',
    //     controller: 'uiviewsidebar',
    //     resolve: {
    //         auth: function(AuthResolver) {
    //             return AuthResolver.resolve();
    //         }
    //     }
    // })


});