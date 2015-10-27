'use strict';

angular.module('sureAuditAdminApp')
  .controller('LoginCtrl', function ($scope, authService) {
    var self = this;
    self.loginData = {
    		userName: '',
    		password: '',
    		customerId: ''
    }
    
    self.login = function(){
    	debugger;	
		authService.login(self.loginData).then(function (response){
			debugger;
		}, function (err){
			
		});
    };

  });