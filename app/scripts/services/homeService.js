"use strict";

angular.module('sureAuditAdminApp')
	.service('homeService', function ($http, configurations) {
		
		this.getCounts = function(){
			var request = {
				method: 'GET',
				url: configurations.sureAudit + configurations.serviceBase + 'Counts'
			}

	    	$http(request).then(function success(response){
	    		return response
		  	},function error(response){
		  		console.log(response);
		  	});

		},

		this.getDumydata = function(){

			var dummyData =	{
			  "AuditGroups": 2,
			  "AuditDefinitions": 2,
			  "AuditResponses": 2,
			  "MasterQuestions": 11,
			  "MasterSections": 3,
			  "PickLists": 2,
			  "QuestionTypes": 11,
			  "SubjectGroups": 2,
			  "Users": 4,
			  "UserGroups": 3
			}

			return dummyData ;

		}

	})