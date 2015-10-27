'use strict';

app.factory('authService', function ($http, $q, $rootScope,configurations) {
	
	var autService = configurations.identity;
	var authServiceFactory = {};
	 
    var _authentication = {
        isAuth: false,
        userName : ""
    };
    

    var _login = function (loginData) {
 
        var data = "username=" + loginData.userName + "&password=" + loginData.password +"&grant_type="
        + configurtions.grantType + "&devicekey=" + configurations.deviceKey + "&appkey=" + configurations.appKey
        + "&custkey=" + configurations.custKey;
        
 
        var deferred = $q.defer();
 
        $http.post(serviceBase + 'token', data, { headers: { 'Content-Type': configurations.contentType } })
        .success(function (response) {
        	debugger;
        	$rootScope.authData = {};
        	$rootScope.authData.token = response.access_token;
           /// localStorageService.set('authorizationData', { token: response.access_token, userName: loginData.userName });
 
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
    	 
      
 
        _authentication.isAuth = false;
        _authentication.userName = "";
 
    };
 
    var _fillAuthData = function () {
 
        var authData = $rootScope.authData;
        if (authData)
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