"use strict";

angular.module('sureAuditAdminApp')
	.factory('surveyGroupService', function ($http, $q, configurations) {
		
		var surveyGroupServiceFactory = {};
		var _getData = function(){
			var deferred = $q.defer();
			var request = {
				method: 'GET',
				url: configurations.sureAudit + configurations.serviceBase + 'AuditGroups'
			};

	    	$http(request).success( function(response){
	    		deferred.resolve(response);
		  	}).error(function(err){
		  		deferred.reject(err);
		  	});
			

		  	return deferred.promise;
		};
		
		
		var _deleteSurvey = function (id) {
			var deferred = $q.defer();
			var request = {
				method: 'DELETE',
				url: configurations.sureAudit + configurations.serviceBase + 'AuditGroups/'+ id,
			};

	    	$http(request).success( function(response){
	    		deferred.resolve(response);
		  	}).error(function(err){
		  		deferred.reject(err);
		  	});
			return deferred.promise;
		};
		
		var _getSurvey = function (id) {
			var deferred = $q.defer();
			var request = {
				method: 'GET',
				url: configurations.sureAudit + configurations.serviceBase + 'AuditGroups/'+ id,
			};

	    	$http(request).success( function(response){
	    		deferred.resolve(response);
		  	}).error(function(err){
		  		deferred.reject(err);
		  	});
			return deferred.promise;
		};

		surveyGroupServiceFactory.getData = _getData;
		surveyGroupServiceFactory.deleteSurvey = _deleteSurvey;
		surveyGroupServiceFactory.getSurvey = _getSurvey;
		return surveyGroupServiceFactory;
	});