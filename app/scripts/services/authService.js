'use strict';

app.factory('authService',function ($http, $q, $rootScope, $state, configurations, localStorageService) {
	
	var autService = configurations.identity;
	var serviceBase = configurations.serviceBase;
	var authServiceFactory = {};
	 
    var _authentication = {
        isAuth: false,
        userName : ""
    };
    

    var _login = function (loginData) {
    	var data = "username=" + loginData.userName + "&password=" + loginData.password + "&custkey=" + loginData.customerId
    	+ "&grant_type=" + configurations.grantType + "&devicekey=" + configurations.deviceKey + "&appkey=" + configurations.appKey;
    	var deferred = $q.defer();
    	$http.post(autService + serviceBase + 'token', data, { headers: { 'Content-Type': configurations.contentType, 'Accept': configurations.acceptType } })
    		.success(function (response) {
    			localStorageService.set('authData',response);
    			_authentication.isAuth = true;
    			_authentication.userName = loginData.userName;
    			deferred.resolve(response);
    		}).error(function (err, status) {
    			_logOut();
    			deferred.reject(err);
    		});
 
    			return deferred.promise;
    };
    
    var _logOut = function () {
    	localStorageService.remove('authData');
    	localStorageService.remove('userData');
        _authentication.isAuth = false;
        _authentication.userName = "";
        $state.go('login');
 
    };
 
    var _fillAuthData = function () {
        var authData = localStorageService.get('authData');
        if (authData!=null)
        {
            _authentication.isAuth = true;
            _authentication.userName = authData.userName;
        }
 
    };
    
    authServiceFactory.login = _login;
    authServiceFactory.logOut = _logOut;
    authServiceFactory.fillAuthData = _fillAuthData;
    authServiceFactory.authentication = _authentication;
 
    return authServiceFactory;
});