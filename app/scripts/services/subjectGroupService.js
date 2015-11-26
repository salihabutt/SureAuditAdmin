"use strict";

angular.module('sureAuditAdminApp')
	.factory('SubjectGroupService', function ($http, $q, configurations) {
		
		var SubjectGroupServiceFactory = {};
		var _getDataGroup = function(){
			var deferred = $q.defer();
			var request = {
				method: 'GET',
				url: configurations.sureAudit + configurations.serviceBase + 'SubjectGroups'
			};

	    	$http(request).success( function(response){
	    		deferred.resolve(response);
		  	}).error(function(err){
		  		deferred.reject(err);
		  	});
			

		  	return deferred.promise;
		};

		SubjectGroupServiceFactory.getDataGroup = _getDataGroup;
		return SubjectGroupServiceFactory;
	});