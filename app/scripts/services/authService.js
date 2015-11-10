'use strict';

angular.module('sureAuditAdminApp')
.factory('authService',function ($http, $q, $rootScope, $state, configurations, localStorageService) {
	
	var autService = configurations.identity;
	var serviceBase = configurations.serviceBase;
	var authServiceFactory = {};
	 
    var _authentication = {
        isAuth: false,
        userName : ""
    };
    

    var _login = function (loginData) {
    	var data = 'username=' + loginData.userName + '&password=' + loginData.password + '&custkey=' + loginData.customerId + '&grant_type=' + configurations.grantType + '&devicekey=' + configurations.deviceKey + '&appkey=' + configurations.appKey;
    	var deferred = $q.defer();
    	$http.post(autService + serviceBase + 'token', data, { headers: { 'Content-Type': configurations.contentType, 'Accept': configurations.acceptType } })
    		.success(function (response) {
    			if (loginData.rememberMe) {
    				var refreshData = {};
    				refreshData.refresh_token = response.refresh_token;
    				refreshData.customer_key = loginData.customerId;
        			localStorageService.set('refreshData',refreshData);
    			} else {
    				localStorageService.remove('requiresRefresh');
    			}
    			localStorageService.set('authData',response.access_token);
    			_authentication.isAuth = true;
    			_authentication.userName = loginData.userName;
    			deferred.resolve(response);
    		}).error(function (err) {
    			_logOut();
    			deferred.reject(err);
    		});
 
    			return deferred.promise;
    };
    
    var _logOut = function () {
    	localStorageService.remove('authData');
    	localStorageService.remove('refreshData');
        _authentication.isAuth = false;
        _authentication.userName = "";
        $state.go('login');
 
    };
 
    var _fillAuthData = function () {
        var authData = localStorageService.get('authData');
        if (authData !== null)
        {
            _authentication.isAuth = true;
            _authentication.userName = authData.userName;
        }
 
    };
    
    var _relogin = function (refreshData) {
    	var data = 'custkey=' + refreshData.customer_key + '&grant_type2=' + configurations.grantType2 + '&devicekey=' + configurations.deviceKey + '&appkey=' + configurations.appKey + '&refresh_token=' + refreshData.refresh_token;
    	var deferred = $q.defer();
    	$http.post(autService + serviceBase + 'token', data, { headers: { 'Content-Type': configurations.contentType, 'Accept': configurations.acceptType } })
    		.success(function (response) {
    			refreshData.refresh_token = response.refresh_token;
    			localStorageService.set('refreshData',refreshData);
    			localStorageService.set('authData',response.access_token);
    			_authentication.isAuth = true;
    			deferred.resolve(response);
    		}).error(function (err) {
    			_logOut();
    			deferred.reject(err);
    		});
    	
    	return deferred.promise;
    };

    
  
    authServiceFactory.login = _login;
    authServiceFactory.logOut = _logOut;
    authServiceFactory.fillAuthData = _fillAuthData;
    authServiceFactory.authentication = _authentication;
    authServiceFactory.relogin = _relogin;
 
    return authServiceFactory;
});