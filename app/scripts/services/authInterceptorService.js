'use strict';
angular.module('sureAuditAdminApp')
.factory('authInterceptorService',function ($q, $injector, configurations, localStorageService) {
 
    var authInterceptorServiceFactory = {};
 
    var _request = function (config) {
        config.headers = config.headers || {};
        var authData = localStorageService.get('authData');
        if (authData) {
            config.headers.Authorization = 'Bearer ' + authData;
            config.headers.Accept = configurations.acceptType;
        }
 
        return config;
    };
 
    var _responseError = function (rejection) {
        if (rejection.status === 401) {
        	localStorageService.remove('authData');
        	var refreshData = localStorageService.get('refreshData');
        	if(refreshData){
        		$injector.invoke(function(authService) {
        			authService.relogin(refreshData).then(function () {
        				$injector.get('$state').go($injector.get('$state').current.name);
        			});
        		});
        		
        	}
        	$injector.get('$state').go('login');
        }
        return $q.reject(rejection);
    };
    
    authInterceptorServiceFactory.request = _request;
    authInterceptorServiceFactory.responseError = _responseError;
 
    return authInterceptorServiceFactory;
});