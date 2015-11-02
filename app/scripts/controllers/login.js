'use strict';

angular.module('sureAuditAdminApp')
  .controller('LoginCtrl', function ($scope, $state, authService) {
	var scope = $scope;
    var self = this;
    self.disableLoginBtn = true;
    scope.loginData = {
    		userName: '',
    		password: '',
    		customerId:'',
    		rememberMe: false
    };
    self.loginDataCopy = angular.copy(scope.loginData);
    self.isError = false;
    self.login = function () {	
    	self.isError = false;
		authService.login(scope.loginData).then(function (response){			
			$state.go('home');
		}, function (err){
			self.isError = true;
			$scope.loginData = {};
		});
    };
    
    scope.$watch('loginData', function(newVal, oldVal){
    	scope.loginData.userName = newVal.userName===undefined? '' : newVal.userName;
    	scope.loginData.password = newVal.password===undefined? '' : newVal.password;
    	scope.loginData.customerId = newVal.customerId===undefined? '' : newVal.customerId;
    	if (!angular.equals(self.loginDataCopy,scope.loginData)) {
    		self.disableLoginBtn = false;
    	}else {
    		self.disableLoginBtn = true;
    	}
    },true);
    
    
  });