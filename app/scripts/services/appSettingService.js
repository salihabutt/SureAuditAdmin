"use strict";

angular.module('sureAuditAdminApp')
	.factory('appSettingService', function ($http, $q, configurations) {
		
		var profileServiceFactory = {};
		var _getData = function(){
			var deferred = $q.defer();
			var request = {
				method: 'GET',
				//url: configurations.sureAudit + configurations.serviceBase + 'Counts'
			}

	    	$http(request).success( function(response){
	    		deferred.resolve(response);
		  	}).error(function(err,status){
		  		deferred.reject(err);
		  	});
			

		  	return deferred.promise;
		};

		profileServiceFactory.getCounts = _getCounts;
		return profileServiceFactory;
	});