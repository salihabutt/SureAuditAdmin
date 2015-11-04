'use strict';

angular.module('sureAuditAdminApp')
.factory('lookupService', function ($q, $http, configurations) {
	var lookupFactoryService = {};
	var questionTypesObj = {};
	var _questionTypes = function () {
		var request = {
			method: 'GET',
			url: configurations.sureAudit + configurations.serviceBase + 'QuestionTypes'
		};

    	$http(request).success( function(response){
    		questionTypesObj = response;
	  	}).error(function(){
	  	});
		
	};
	
	var _getQuestionTypes = function () {
		return questionTypesObj;
	}
	
	lookupFactoryService.questionTypes = _questionTypes;
	lookupFactoryService.questionTypesObj = _getQuestionTypes;
	
	return lookupFactoryService;
});