angular.module(config.angular.name).controller('tagsDetailController', function($scope, $stateParams, $http) {
    $scope.$on('$viewContentLoaded', function() {
        $http.get("tags/pageQuery?pagesize=" + $scope.pagination.items_per_page +
            "&pageindex=" + $stateParams["id"]).success(function(response) {
            $scope.$emit("changechange", response)

        }).error(function(response) {
            console.log(response);
        });
    });
})