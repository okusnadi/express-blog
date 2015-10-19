var app = angular.module(config.angular.name, [
    'ui.router', 'ui.bootstrap',
    "oc.lazyLoad",'ngResource'
]);
app.run(function($q, $rootScope, $state, $http, $modalStack) {
    $rootScope.$on('$stateChangeStart',
        function(event, toState, toParams, fromState, fromParams) {
            $state.current = toState;
            //$modalStack.dismissAll();
        }
    )
    $rootScope.$on('$stateChangeSuccess',
        function(event, toState, toParams, fromState, fromParams) {
            // if ($scope.currentModal) {
            //     $scope.currentModal.dismiss();
            // }
            $modalStack.dismissAll();
        }
    )
})