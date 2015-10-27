'use strict';

angular.module('sureAuditAdminApp')
  .controller('LoginCtrl', function ($scope, authService, $state) {
    var self = this;
    self.loginData = {
    		userName: '',
    		password: '',
    		customerId: ''
    };
    self.isError = false;
    localStorage.setItem('key','saliha');
    self.login = function(){	
		authService.login(self.loginData).then(function (response){
			self.isError = false;
			$state.go('home');
		}, function (err){
			self.isError = true;
		});
    };

  });