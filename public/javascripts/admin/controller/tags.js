function tags111() {
    this.id;
    this.name;
    this.created_at;
    this.updated_at;
    this.pagesize;
    this.pageindex;
}

tags111.prototype.pageQuery = function(success, error) {
    orm.pageQuery({
        "pagestart": (this.pageindex - 1) * this.pagesize,
        "pagesize": this.pagesize
    }, success, error);
}

tags111.prototype.query = function(success, error) {
    orm.query({
        "id": this.id
    }, success, error);
}

tags111.prototype.get = function(success, error) {
    orm.get({
        "id": this.id
    }, success, error);
}

tags111.prototype.remove = function(success, error) {
    orm.remove({
        "id": this.id
    }, success, error);
};

tags111.prototype.insert = function(success, error) {
    orm.insert({
        "id": this.id
    }, success, error);
};

tags111.prototype.update = function(success, error) {
    orm.update({
        "id": this.id,
        "name": this.name
    }, success, error);
};

angular.module(config.angular.name).factory('tags_factory', function($resource) {
    return $resource("/", {}, {
        get: {
            method: "GET",
            url: 'tags/update/:id',
            params: {
                id: "id"
            }
        },
        remove: {
            method: "POST",
            url: 'tags/delete'
        },
        add: {
            method: "POST",
            url: 'tags/insert'
        },
        save1: {
            method: "POST",
            url: 'tags/update',
            isArray: false,
            transformResponse: function(data, headers) {
                console.log("data.toString()", data)
                return data;
            }
        },
        query: {
            method: "GET",
            url: 'articles/select',
            isArray: true
        }
    });
});





angular.module(config.angular.name).controller('tagsController', function($scope, $http) {
    $scope.items = []
    $scope.$on('$viewContentLoaded', function() {
        $http.get("tags/select").success(function(response) {
            $scope.items = response
        }).error(function(response) {
            console.log(response);
        });
    });

    $scope.$on('MessageTagsInsert', function(event, msg) {
        $scope.items.push(msg);
    });
})




angular.module(config.angular.name).directive('tagsInsertDirective', function() {
    return {
        restrict: 'A',
        scope: true,
        controller: function($scope, $element, $uibModal) {
            $scope.insert = function() {
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: 'tags/insert.html',
                    controller: 'tagsInsertDialogController',
                    backdrop: "static",
                    windowClass: 'center-modal'
                });
                modalInstance.result.then(function(rItem) {
                        $scope.$emit("MessageTagsInsert", rItem);
                    },
                    function(error) {
                        if (error !== true) {
                            console.log("tags/insert/ : ", error);
                        }
                    }
                );
            }
        },
        link: function($scope, element, attrs) {}
    };
});


angular.module(config.angular.name).controller('tagsInsertDialogController',
    function($scope, $state, $http, $modalInstance) {
        $scope.item = {};
        $scope.item.id = "";
        $scope.item.name = "";
        $scope.item.created_at = "";
        $scope.item.updated_at = "";
        $scope.post = function() {
            $http.post("tags/insert", {
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


angular.module(config.angular.name).directive('tagsUpdateDirective', function() {
    return {
        restrict: 'A',
        scope: true,
        controller: function($scope, $element, $http, $uibModal) {
            $scope.delete = function(index) {
                $http.post("tags/delete", {
                    "id": $scope.item.id
                }).success(function(response) {
                    $scope.items.splice(index, 1);
                }).error(function(response) {});
            }
            $scope.update = function() {
                $http.get("tags/update/" + $scope.item.id)
                    .success(function(response) {
                        var modalInstance = $uibModal.open({
                            animation: true,
                            templateUrl: 'tags/update.html',
                            controller: 'tagsUpdateDialogController',
                            backdrop: "static",
                            windowClass: 'center-modal',
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
                                    console.log("tags/update/ : ", error);
                                }
                            }
                        );
                    }).error(function(response) {
                        console.log("tags/update/ : ", response);
                    });

            }
        },
        link: function($scope, element, attrs) {}
    };
});

angular.module(config.angular.name).controller('tagsUpdateDialogController', function($scope, $http, $modalInstance, item) {
    $scope.item = item;
    $scope.post = function() {
        $http.post("tags/update", {
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