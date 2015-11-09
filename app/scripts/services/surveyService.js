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
		  	}).error(function(err){
		  		deferred.reject(err);
		  	});
			

		  	return deferred.promise;
		};
		
		var _saveSurvey = function (data) {
			var deferred = $q.defer();
			var request = {
				method: 'POST',
				url: configurations.sureAudit + configurations.serviceBase + 'AuditDefinitions',
				data: JSON.stringify(data)
			}

	    	$http(request).success( function(response){
	    		deferred.resolve(response);
		  	}).error(function(err){
		  		deferred.reject(err);
		  	});
			

		  	return deferred.promise;
		};
		
		var _updateSurvey = function (data) {
			var deferred = $q.defer();
			var request = {
				method: 'PUT',
				url: configurations.sureAudit + configurations.serviceBase + 'AuditDefinitions/'+ data.Id,
				data: JSON.stringify(data)
			}

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
				url: configurations.sureAudit + configurations.serviceBase + 'AuditDefinitions/'+ id,
			}

	    	$http(request).success( function(response){
	    		deferred.resolve(response);
		  	}).error(function(err){
		  		deferred.reject(err);
		  	});
			return deferred.promise;
		};

		surveyServiceFactory.getData = _getData;
		surveyServiceFactory.saveSurvey = _saveSurvey;
		surveyServiceFactory.updateSurvey = _updateSurvey;
		surveyServiceFactory.deleteSurvey = _deleteSurvey;
		return surveyServiceFactory;
	});