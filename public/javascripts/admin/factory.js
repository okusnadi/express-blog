app.factory('authsystem', function($http) {
    var b;
    return {
        status: function() {
            return b;
        },
        login: function() {
            b = true;
        },
        out: function() {
            b = false;
        }
    };
});
app.factory('AuthInterceptor', function($rootScope, $q, SERVER_Response) {
    return {
        request: function(config) {
            return config;
        },
        response: function(response) {
            $rootScope.$emit(SERVER_Response.all,
                response.status,
                response.headers("hdata"),
                response.headers("token"));
            return response;
        },
        responseError: function(response) {
            $rootScope.$emit(SERVER_Response.all,
                response.status,
                response.headers("hdata"),
                response.headers("token"));
            if (response.status == 401) {
                return response;
            }
            return $q.reject(response);
        }
    };
})

app.config(function($httpProvider) {
    $httpProvider.interceptors.push('AuthInterceptor');
})