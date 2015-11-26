"use strict";

angular.module('sureAuditAdminApp')
	.factory('surveyGroupService', function ($http, $q, configurations) {
		
		var surveyGroupServiceFactory = {};
		var _getDataGroup = function(){
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
		
		
		var _deleteSurveyGroup = function (id) {
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

		var _saveSurveyGroup = function (data) {
			var deferred = $q.defer();
			var request = {
				method: 'POST',
				url: configurations.sureAudit + configurations.serviceBase + 'AuditGroups',
				data: JSON.stringify(data)
			};

	    	$http(request).success( function(response){
	    		deferred.resolve(response);
		  	}).error(function(err){
		  		deferred.reject(err);
		  	});
			

		  	return deferred.promise;
		};
		
		var _updateSurveyGroup = function (data) {
			var deferred = $q.defer();
			var request = {
				method: 'PUT',
				url: configurations.sureAudit + configurations.serviceBase + 'AuditGroups/'+ data.Id,
				data: JSON.stringify(data)
			};

	    	$http(request).success( function(response){
	    		deferred.resolve(response);
		  	}).error(function(err){
		  		deferred.reject(err);
		  	});
			return deferred.promise;
		};

		var _getSurveyGroup = function (id) {
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

		surveyGroupServiceFactory.getDataGroup = _getDataGroup;
		surveyGroupServiceFactory.deleteSurveyGroup = _deleteSurveyGroup;
		surveyGroupServiceFactory.getSurveyGroup = _getSurveyGroup;
		surveyGroupServiceFactory.saveSurveyGroup = _saveSurveyGroup;
		surveyGroupServiceFactory.updateSurveyGroup = _updateSurveyGroup;
		return surveyGroupServiceFactory;
	});