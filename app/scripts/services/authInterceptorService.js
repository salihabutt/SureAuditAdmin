'use strict';
app.factory('authInterceptorService',function ($q, $rootScope, $injector, configurations, localStorageService) {
 
    var authInterceptorServiceFactory = {};
 
    var _request = function (config) {
        config.headers = config.headers || {};
        var authData = localStorageService.get('authData');
        if (authData) {
            config.headers.Authorization = 'Bearer ' + authData.access_token;
            config.headers.Accept = configurations.acceptType;
        }
 
        return config;
    }
 
    var _responseError = function (rejection) {
        if (rejection.status === 401) {
        	$injector.get('$state').go('login');
        }
        return $q.reject(rejection);
    }
 
    authInterceptorServiceFactory.request = _request;
    authInterceptorServiceFactory.responseError = _responseError;
 
    return authInterceptorServiceFactory;
});