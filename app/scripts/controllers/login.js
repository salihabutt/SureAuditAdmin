'use strict';

angular.module('sureAuditAdminApp')
  .controller('LoginCtrl', function ($state, authService) {
    var self = this;
    self.disableLoginBtn = true;
    self.loginData = {
    		userName: '',
    		password: '',
    		customerId:'',
    		rememberMe: false
    };
    self.loginDataCopy = angular.copy(self.loginData);
    self.isError = false;
    self.login = function () {	
    	self.isError = false;
		authService.login(self.loginData).then(function (){			
			$state.go('home');
		}, function (){
			self.isError = true;
			self.loginData = {};
		});
    };
    
    
    self.update = function () {
    	if (!angular.equals(self.loginDataCopy,self.loginData)) {
    		self.disableLoginBtn = false;
    	}else {
    		self.disableLoginBtn = true;
    	}
    };
    
  });