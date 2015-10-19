angular.module(config.angular.name).controller('loginController', function($q, $scope, $http) {
    $scope.post = function() {
        $http.post("auth/TestloginSuccess", {
            email: "admin@admin.com"
        }).success(function(response) {}).error(function(response) {});
    }
    $scope.post2 = function() {
        $http.post("auth/TestloginFailed", {
            email: "admin@admin.com"
        }).success(function(response) {}).error(function(response) {});
    }
    $scope.get = function() {
        $http.get("auth/get").success(function(response) {
            alert(response)
        }).error(function(response) {});
    }
});