angular.module(config.angular.name).controller('categoriesController', function($scope, $http) {
    $scope.items = []
    $scope.$on('$viewContentLoaded', function() {
        $http.get("categories/select").success(function(response) {

            $scope.items = response
        }).error(function(response) {
            console.log(response);
        });
    });

    $scope.$on('MessagecategoriesInsert', function(event, msg) {
        $scope.items.push(msg);
    });
})


angular.module(config.angular.name).directive('categoriesInsertDirective', function() {
    return {
        restrict: 'A',
        scope: true,
        controller: function($scope, $element, $uibModal) {
            $scope.insert = function() {
                var modalInstance = $uibModal.open({
                    animation: false,
                    templateUrl: 'categories/insert.html',
                    controller: 'categoriesInsertDialogController',
                    backdrop: false
                });
                modalInstance.result.then(function(rItem) {
                        $scope.$emit("MessagecategoriesInsert", rItem);
                    },
                    function(error) {
                        if (error !== true) {
                            console.log("categories/insert/ : ", error);
                        }
                    }
                );
            }
        },
        link: function($scope, element, attrs) {}
    };
});


angular.module(config.angular.name).controller('categoriesInsertDialogController', function($scope, $http, $modalInstance) {
    $scope.item = {};
    $scope.item.id = "";
    $scope.item.name = "";
    $scope.item.created_at = "";
    $scope.item.updated_at = "";
    $scope.post = function() {
        $http.post("categories/insert", {
            "data": $scope.item.name
        }).success(function(response) {
            if (response.id >= 0) {
                $modalInstance.close(response);
            } else {
                $modalInstance.dismiss(response);
            }
        }).error(function(response) {
            $modalInstance.dismiss(response);
        });
    };

    $scope.cancel = function() {
        $modalInstance.dismiss(true);
    };
});


angular.module(config.angular.name).directive('categoriesUpdateDirective', function() {
    return {
        restrict: 'A',
        scope: true,
        controller: function($scope, $element, $http, $uibModal) {
            $scope.delete = function(index) {
                $http.post("categories/delete", {
                    "id": $scope.item.id
                }).success(function(response) {
                    $scope.items.splice(index, 1);
                }).error(function(response) {});
            }
            $scope.update = function() {
                $http.get("categories/update/" + $scope.item.id)
                    .success(function(response) {
                        var modalInstance = $uibModal.open({
                            animation: false,
                            templateUrl: 'categories/update.html',
                            controller: 'categoriesUpdateDialogController',
                            backdrop: false,
                            resolve: {
                                item: function() {
                                    return response;
                                }
                            }
                        });
                        modalInstance.result.then(function(rItem) {
                                $scope.item = rItem;
                            },
                            function(error) {
                                if (error !== true) {
                                    console.log("categories/update/ : ", error);
                                }
                            }
                        );
                    }).error(function(response) {
                        console.log("categories/update/ : ", response);
                    });

            }
        },
        link: function($scope, element, attrs) {}
    };
});

angular.module(config.angular.name).controller('categoriesUpdateDialogController', function($scope, $http, $modalInstance, item) {
    $scope.item = item;
    $scope.post = function() {
        $http.post("categories/update", {
            "id": $scope.item.id,
            "name": $scope.item.name
        }).success(function(response) {
            if (response == 1) {
                $modalInstance.close($scope.item);
            } else {
                $modalInstance.dismiss(response);
            }
        }).error(function(response) {
            $modalInstance.dismiss(response);
        });
    };
    $scope.cancel = function() {
        $modalInstance.dismiss(true);
    };
});