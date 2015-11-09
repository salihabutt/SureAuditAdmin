"use strict";

angular.module('sureAuditAdminApp')
	.factory('surveyService', function ($http, $q, configurations) {
		
		var surveyServiceFactory = {};
		var _getData = function(){
			var deferred = $q.defer();
			var request = {
				method: 'GET',
				url: configurations.sureAudit + configurations.serviceBase + 'AuditDefinitions'
			}

	    	$http(request).success( function(response){
	    		deferred.resolve(response);
		  	}).error(function(err,status){
		  		deferred.reject(err);
		  	});
			

		  	return deferred.promise;
		};

		surveyServiceFactory.getData = _getData;
		return surveyServiceFactory;
	});