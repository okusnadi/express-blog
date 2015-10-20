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
    //$scope.items.pageindex = 1;
    //$scope.items.rows = 0;


    $scope.totalItems = 100; //在所有页面项目的总数。
    $scope.itemsPerPage = 1; //每页项目的最大数量。值小于一指在一个页面上的所有项目。
    $scope.maxSize = 5;
    $scope.currentPage = 1;
    $scope.pagedisabled = false;

    $scope.pageChanged = function() {

        $scope.pagedisabled = true;
        $http.get("tags/pageQuery?pageindex=" + $scope.currentPage).success(function(response) {
            console.log(response[1])
            $scope.items = response[0]
            $scope.totalItems = response[1].rows;
            $scope.currentPage = response[1].pageindex;
            $scope.pagedisabled = false;
        }).error(function(response) {
            console.log(response);
            $scope.pagedisabled = false;
        });

    };

    $scope.$on('$viewContentLoaded', function() {
        $http.get("tags/pageQuery").success(function(response) {
            console.log(response[1])
            $scope.items = response[0]
            $scope.totalItems = response[1].rows;
            $scope.currentPage = response[1].pageindex;;
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
                if (response.insertid >= 0) {
                    $scope.item.id = response.insertid;
                    $scope.item.created_at = response.created_at
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


angular.module(config.angular.name).directive('tagsUpdateDirective', function() {
    return {
        restrict: 'A',
        scope: true,
        controller: function($scope, $element, $http, $uibModal) {
            $scope.delete = function(index) {
                $http.post("tags/remove", {
                    "id": $scope.item.id
                }).success(function(response) {
                    if (response.affected_rows == 1) {
                        $scope.items.splice(index, 1);
                    } else {
                        alert("删除失败")
                    }
                }).error(function(response) {});
            }
            $scope.update = function() {
                $http.get("tags/get/" + $scope.item.id)
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
            if (response.affected_rows == 1) {
                $scope.updated_at = response.updated_at;
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