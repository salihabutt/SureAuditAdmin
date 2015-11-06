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
		
		var _saveQuestion = function (question) {
			var request = {
				method: 'POST',
				url: configurations.sureAudit + configurations.serviceBase + 'MasterQuestions',
				data: JSON.stringify(question)
			};
		  	return request;			
		};
		
		var _updateQuestion = function (question) {
			var request = {
				method: 'PUT',
				url: configurations.sureAudit + configurations.serviceBase + 'MasterQuestions/' + question.Id,
				data: JSON.stringify(question)
			};
	    	return request;			
		};
		
		var _saveUpdateQuestion = function (question,action) {
			var deferred = $q.defer();
			var request = {};
			if(action === 'ADD') {
				request = _saveQuestion(question);
				
			}else {
				request = _updateQuestion(question);
			}
			
			$http(request).success( function (response) {
	    		deferred.resolve(response);
		  	}).error(function(err){
		  		deferred.reject(err);
		  	});
			

		  	return deferred.promise;
		};

		masterQuestionFactory.getData = _getData;
		masterQuestionFactory.saveQuestion = _saveQuestion;
		masterQuestionFactory.updateQuestion = _updateQuestion;
		masterQuestionFactory.saveUpdateQuestion = _saveUpdateQuestion;
		return masterQuestionFactory;
	});