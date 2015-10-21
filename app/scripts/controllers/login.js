'use strict';

angular.module('sureAuditAdminApp')
  .controller('LoginCtrl', function ($scope, $http) {
    $scope.submitForm = function(){
    	var request = {
			method: 'POST',
			url: 'https://identity-dev.propelics.com/api/v1/token',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
				'Accept': 'application/json'
			},
			data: JSON.stringify({
	    		'username' : 'testuser',
				'password' : 'testuser',
				'appkey' : 'sureaudit',
				'custkey' : 'propelics',
				'devicekey' : 'anykey',
				'grant_type' : 'password'
	    	})
		};
		console.log(request.data)

	  	$http(request).then(function success(responce){
	  		console.log(responce);
	  	},function error(responce){
	  		console.log(responce);
	  	});
  	}

  });