'use strict';

angular.module('sureAuditAdminApp')
  .controller('LoginCtrl', function ($scope, $state, authService, localStorageService) {
    var self = this,
    init = function () {
    	self.loginData = {};
    	var userData = localStorageService.get('userData');
    	if(userData){
    		self.loginData = userData;
    	}
    };
    
    self.isError = false;
    self.login = function () {	
    	self.isError = false;
		authService.login(self.loginData).then(function (response){			
			$state.go('home');
		}, function (err){
			self.isError = true;
			self.loginData = {};
		});
    };
    
    init();
  });