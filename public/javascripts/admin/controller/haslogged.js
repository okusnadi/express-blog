angular.module(config.angular.name).controller('hasloggedController', function($scope, $http) {
    $scope.post1 = function() {
        $http.post("auth/hasloggedPost1", {
            email: "admin@admin.com"
        }).success(function(response) {
            alert(response)
        }).error(function(response) {});
    }
    $scope.post2 = function() {
        $http.post("auth/hasloggedPost2", {
            email: "admin@admin.com"
        }).success(function(response) {
            alert(response)
        }).error(function(response) {});
    }
});
