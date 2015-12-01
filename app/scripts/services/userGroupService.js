"use strict";

angular.module('sureAuditAdminApp')
	.factory('userGroupService', function ($http, $q, configurations) {
		
		var userGroupServiceFactory = {};
		
		var _getData = function(){
			var deferred = $q.defer();
			var request = {
				method: 'GET',
				url: configurations.identity + configurations.serviceBase + 'Groups'
			};

	    	$http(request).success( function(response){
	    		deferred.resolve(response);
		  	}).error(function(err){
		  		deferred.reject(err);
		  	});
			

		  	return deferred.promise;
		};
		
		var _getUserGroupAssociation = function (id) {
				var deferred = $q.defer();
				var request = {
					method: 'GET',
					url: configurations.sureAudit + configurations.serviceBase + 'GroupAssociations/'+id
				};

		    	$http(request).success( function(response){
		    		deferred.resolve(response);
			  	}).error(function(err){
			  		deferred.reject(err);
			  	});
				
		    	return deferred.promise;
		};
		
		var _deleteUserGroupAssociation = function (id) {
			var deferred = $q.defer();
			var request = {
				method: 'DELETE',
				url: configurations.sureAudit + configurations.serviceBase + 'GroupAssociations/'+id
			};

	    	$http(request).success( function(response){
	    		deferred.resolve(response);
		  	}).error(function(err){
		  		deferred.reject(err);
		  	});
			
	    	return deferred.promise;
	};
		
		
		userGroupServiceFactory.getData = _getData;
		userGroupServiceFactory.getUserGroupAssociation = _getUserGroupAssociation;
		userGroupServiceFactory.deleteUserGroupAssociation = _deleteUserGroupAssociation;
		
		return userGroupServiceFactory;
	});