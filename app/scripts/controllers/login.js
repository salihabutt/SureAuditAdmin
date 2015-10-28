'use strict';

angular.module('sureAuditAdminApp')
  .controller('LoginCtrl', function ($scope, $state, authService, localStorageService) {
    var self = this,
    init = function () {
    	self.loginData = {};
    	var userData = localStorageService.get('userData');
    	if(userData){
    		self.loginData = userData;
    		self.rememberMe = true;
    	}
    };
    
    self.isError = false;
    self.rememberMe = false;
    self.login = function () {	
		authService.login(self.loginData).then(function (response){
			if (self.rememberMe) {
	    		localStorageService.set('userData',self.loginData);
	    	}else {
	    		localStorageService.remove('userData');
	    	}
			self.isError = false;
			$state.go('home');
		}, function (err){
			self.isError = true;
			self.loginData = {};
		});
    };
    
    init();
  });