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
		
		var _getUserGroupAssociation = function (key) {
				var deferred = $q.defer();
				var request = {
					method: 'GET',
					url: configurations.sureAudit + configurations.serviceBase + '/groupAssociations?query=UserGroups~eq~'+key
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
	
	var _saveUserGroupAssociation = function (groupAssociation) {
		var deferred = $q.defer();
		var request = {
			method: 'POST',
			url: configurations.sureAudit + configurations.serviceBase + 'GroupAssociations',
			data: JSON.stringify(groupAssociation)
		};

    	$http(request).success( function(response){
    		deferred.resolve(response);
	  	}).error(function(err){
	  		deferred.reject(err);
	  	});
		
    	return deferred.promise;
		
	};
	
	var _updateUserGroupAssociation = function (groupAssociation) {
		var deferred = $q.defer();
		var request = {
			method: 'PUT',
			url: configurations.sureAudit + configurations.serviceBase + 'GroupAssociations/'+groupAssociation.Id,
			data: JSON.stringify(groupAssociation)
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
		userGroupServiceFactory.saveUserGroupAssociation = _saveUserGroupAssociation;
		userGroupServiceFactory.updateUserGroupAssociation = _updateUserGroupAssociation;
		
		return userGroupServiceFactory;
	});