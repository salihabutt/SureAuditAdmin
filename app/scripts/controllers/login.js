'use strict';

angular.module('sureAuditAdminApp')
  .controller('LoginCtrl', function ($scope, $http, loginService) {
    
    $scope.login = function(){
    	debugger;	
		loginService.uname = $scope.username; 
		loginService.pass = $scope.password;		
  		loginService.submitForm();
    }

  });