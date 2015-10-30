"use strict";

angular.module('sureAuditAdminApp')
	.factory('homeService', function ($http, $q, configurations) {
		
		var homeServiceFactory = {};
		var _getCounts = function () {
			var deferred = $q.defer();
			var request = {
				method: 'GET',
				url: configurations.sureAudit + configurations.serviceBase + 'Counts'
			}

	    	$http(request).success( function(response){
	    		deferred.resolve(response);
		  	}).error(function(err,status){
		  		deferred.reject(err);
		  	});
			

		  	return deferred.promise;
		};

		var _updateData = function () {
			
		};

		homeServiceFactory.getCounts = _getCounts;
		return homeServiceFactory;
	});