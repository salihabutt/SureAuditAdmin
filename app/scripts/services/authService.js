'use strict';

app.factory('authService',function ($http, $q, $rootScope,configurations) {
	
	var autService = configurations.identity;
	var serviceBase = configurations.serviceBase;
	var authServiceFactory = {};
	 
    var _authentication = {
        isAuth: false,
        userName : ""
    };
    

    var _login = function (loginData) {
    	var data = "username=" + loginData.userName + "&password=" + loginData.password +"&grant_type="
    	+ configurations.grantType + "&devicekey=" + configurations.deviceKey + "&appkey=" + configurations.appKey
    	+ "&custkey=" + configurations.custKey;
    	var deferred = $q.defer();
    	$http.post(autService + serviceBase + 'token', data, { headers: { 'Content-Type': configurations.contentType, 'Accept': configurations.acceptType } })
    		.success(function (response) {
    			$rootScope.authData = {};
    			$rootScope.authData = response;
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
    	 delete $rootScope.authData;
        _authentication.isAuth = false;
        _authentication.userName = "";
 
    };
 
    var _fillAuthData = function () {
        var authData = $rootScope.authData;
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