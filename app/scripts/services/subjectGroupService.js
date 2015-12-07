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
		
		var _getSubjectGroup = function(id){
			var deferred = $q.defer();
			var request = {
				method: 'GET',
				url: configurations.sureAudit + configurations.serviceBase + 'SubjectGroups/'+id
			};

	    	$http(request).success( function(response){
	    		deferred.resolve(response);
		  	}).error(function(err){
		  		deferred.reject(err);
		  	});
			

		  	return deferred.promise;
		};
		
		var _updateSubjectGroup = function (subgroup) {
			var deferred = $q.defer();
			var request = {
					method: 'PUT',
					url: configurations.sureAudit + configurations.serviceBase + 'SubjectGroups/'+ subgroup.Id,
					data: JSON.stringify(subgroup)
			};
			$http(request).success(function (response) {
				deferred.resolve(response);
			}).error(function (err) {
				deferred.reject(err);
			});
			return deferred.promise;
		};

		SubjectGroupServiceFactory.getDataGroup = _getDataGroup;
		SubjectGroupServiceFactory.getSubjectGroup = _getSubjectGroup;
		SubjectGroupServiceFactory.updateSubjectGroup = _updateSubjectGroup;
		return SubjectGroupServiceFactory;
	});