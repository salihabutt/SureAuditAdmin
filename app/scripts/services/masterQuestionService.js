'use strict';

angular.module('sureAuditAdminApp')
	.factory('masterQuestionService', function ($http, $q, configurations) {
		
		var masterQuestionFactory = {};
		var _getData = function () {
			var deferred = $q.defer();
			var request = {
				method: 'GET',
				url: configurations.sureAudit + configurations.serviceBase + 'MasterQuestions'
			};

	    	$http(request).success( function (response) {
	    		deferred.resolve(response);
		  	}).error(function(err){
		  		deferred.reject(err);
		  	});
			

		  	return deferred.promise;
		};
		
		var _saveQuestion = function (data) {
			var deferred = $q.defer();
			var request = {
				method: 'POST',
				url: configurations.sureAudit + configurations.serviceBase + 'MasterQuestions',
				data: JSON.stringify(data)
			};

	    	$http(request).success( function (response) {
	    		deferred.resolve(response);
		  	}).error(function(err){
		  		deferred.reject(err);
		  	});
			

		  	return deferred.promise;
			
		};

		var _deleteQuestion = function (id) {
			var deferred = $q.defer();
			var request = {
				method: 'DELETE',
				url: configurations.sureAudit + configurations.serviceBase + 'MasterQuestions/'+ id 
			};
	    	$http(request).success( function (response) {
	    		deferred.resolve(response);
		  	}).error(function(err){
		  		deferred.reject(err);
		  	});
		  	return deferred.promise;
		};

		masterQuestionFactory.getData = _getData;
		masterQuestionFactory.saveQuestion = _saveQuestion;
		masterQuestionFactory.deleteQuestion = _deleteQuestion;
		return masterQuestionFactory;
	});