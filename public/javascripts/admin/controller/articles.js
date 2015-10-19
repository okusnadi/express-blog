angular.module(config.angular.name).factory('articles_factory', function($resource) {
    return $resource("/", {}, {
        get: {
            method: "GET",
            url: 'articles/update/:id',
            params: {
                id: "id"
            }
        },
        remove: {
            method: "POST",
            url: 'articles/delete'
        },
        add: {
            method: "POST",
            url: 'articles/insert'
        },
        save1: {
            method: "POST",
            url: 'articles/update',
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


angular.module(config.angular.name).controller('articlesController', function($scope, articles_factory) {

    $scope.items = []
    $scope.$on('$viewContentLoaded', function() {
        articles_factory.query(null, function(success) {
            $scope.items = success
        }, function(error) {
            console.log(error);
        });
    });

    $scope.$on('MessagearticlesInsert', function(event, msg) {
        $scope.items.push(msg);
    });
})



angular.module(config.angular.name).directive('articlesInsertDirective', function() {
    return {
        restrict: 'A',
        scope: true,
        controller: function($scope, $element, $uibModal) {
            $scope.insert = function() {
                var modalInstance = $uibModal.open({
                    animation: false,
                    templateUrl: 'articles/insert.html',
                    controller: 'articlesInsertDialogController',
                    backdrop: false,
                    resolve: {
                        loadjs: function($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                name: config.angular.name,
                                serie: true,
                                files: [
                                    '/javascripts/admin/markdown.js'
                                ]
                            });
                        }

                    }
                });

                modalInstance.result.then(function(rItem) {
                        $scope.$emit("MessagearticlesInsert", rItem);
                    },
                    function(error) {
                        if (error !== true) {
                            console.log("articles/insert/ : ", error);
                        }
                    }
                );
            }
        },
        link: function($scope, element, attrs) {}
    };
});


angular.module(config.angular.name).controller('articlesInsertDialogController',
    function($scope, $http, $modalInstance, articles_factory) {
        $scope.item = {};
        $scope.item.id = "";
        $scope.item.title = "";
        $scope.item.content = "";
        $scope.item.created_at = "";
        $scope.item.updated_at = "";
        $scope.loadA = function() {}
        $modalInstance.opened.then(function() {});
        $scope.post = function() {
            articles_factory.add({
                "title": $scope.item.title,
                "content": $scope.item.content
            }, function(success) {
                if (success.id >= 0) {
                    $scope.item.id = success.id;
                    $modalInstance.close($scope.item);
                } else {
                    $modalInstance.dismiss(success);
                }
            }, function(error) {
                $modalInstance.dismiss(response);
            })
        };

        $scope.cancel = function() {
            $modalInstance.dismiss(true);
        };
    });


angular.module(config.angular.name).directive('articlesUpdateDirective', function() {
    return {
        restrict: 'A',
        scope: true,
        controller: function($scope, $element, articles_factory, $http, $uibModal) {
            $scope.delete = function(index) {
                articles_factory.remove({
                    id: $scope.item.id
                }, function(success) {
                    $scope.items.splice(index, 1);
                }, function(error) {
                    console.log(error)
                })
            }
            $scope.update = function() {
                articles_factory.get({
                    "id": $scope.item.id
                }, function(success) {
                    var modalInstance = $uibModal.open({
                        animation: false,
                        templateUrl: 'articles/update.html',
                        controller: 'articlesUpdateDialogController',
                        backdrop: false,
                        resolve: {
                            item: function() {
                                return success;
                            }
                        }
                    });
                    modalInstance.result.then(function(rItem) {
                            $scope.item = rItem;
                        },
                        function(error) {
                            if (error !== true) {
                                console.log("articles/update/ : ", error);
                            }
                        }
                    );
                }, function(error) {
                    console.log("articles/update/ : ", error);
                })

            }
        },
        link: function($scope, element, attrs) {}
    };
});

angular.module(config.angular.name)
    .controller('articlesUpdateDialogController',
        function($scope, articles_factory, $modalInstance, item) {
            $scope.item = item;
            $scope.post = function() {
                // articles_factory.save1({
                //     "id": $scope.item.id,
                //     "title": $scope.item.title,
                //     "content": $scope.item.content
                // }, function(success) {
                //     alert(success)
                //     if (success == 1) {
                //         $modalInstance.close($scope.item);
                //     } else {
                //         $modalInstance.dismiss(success);
                //     }
                // }, function(error) {
                //     $modalInstance.dismiss(error);
                // })

                articles_factory.save1({
                    "id": $scope.item.id,
                    "title": $scope.item.title,
                    "content": $scope.item.content
                }).$promise.then(function(result) {
                    console.log(result);
                });


            };
            $scope.cancel = function() {
                $modalInstance.dismiss(true);
            };
        });