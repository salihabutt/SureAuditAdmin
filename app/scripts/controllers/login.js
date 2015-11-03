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
    
  /*  scope.$watch('loginData', function(newVal, oldVal){
    	scope.loginData.userName = newVal.userName===undefined? '' : newVal.userName;
    	scope.loginData.password = newVal.password===undefined? '' : newVal.password;
    	scope.loginData.customerId = newVal.customerId===undefined? '' : newVal.customerId;
    	if (!angular.equals(self.loginDataCopy,scope.loginData)) {
    		self.disableLoginBtn = false;
    	}else {
    		self.disableLoginBtn = true;
    	}
    },true);*/
    
    self.update = function () {
    	if (!angular.equals(self.loginDataCopy,self.loginData)) {
    		self.disableLoginBtn = false;
    	}else {
    		self.disableLoginBtn = true;
    	}
    };
    
  });