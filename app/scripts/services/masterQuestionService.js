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

		masterQuestionFactory.getData = _getData;
		return masterQuestionFactory;
	})
	.factory('deleteMasterQuestionService', function ($http, $q, configurations) {
		
		var deleteMasterQuestionService = {};
		var _deleteData = function (id) {
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

		deleteMasterQuestionService.deleteData = _deleteData;
		return deleteMasterQuestionService;
	});