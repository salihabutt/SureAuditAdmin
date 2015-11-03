'use strict';
angular.module('sureAuditAdminApp')
.factory('authInterceptorService',function ($q,$http, $injector, configurations, localStorageService) {
 
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
        	var refreshData = localStorageService.get('refreshData');
        	if(refreshData){
        		relogin(refreshData).then(function () {
        			$injector.get('$state').go($injector.get('$state').current.name);
        		});
        	}
        	$injector.get('$state').go('login');
        }
        return $q.reject(rejection);
    };
 
    var relogin = function (refreshData) {
    	var data = 'custkey=' + refreshData.customer_key + '&grant_type2=' + configurations.grantType2 + '&devicekey=' + configurations.deviceKey + '&appkey=' + configurations.appKey + '&refresh_token=' + refreshData.refresh_token;
    	var deferred = $q.defer();
    	$http.post(autService + serviceBase + 'token', data, { headers: { 'Content-Type': configurations.contentType, 'Accept': configurations.acceptType } })
    		.success(function (response) {
    			refreshData.refresh_token = response.refresh_token;
    			localStorageService.set('refreshData',refreshData);
    			localStorageService.set('authData',response.access_token);
    			_authentication.isAuth = true;
    			deferred.resolve(response);
    		}).error(function (err, status) {
    			deferred.reject(err);
    		});
    };
    
    authInterceptorServiceFactory.request = _request;
    authInterceptorServiceFactory.responseError = _responseError;
 
    return authInterceptorServiceFactory;
});