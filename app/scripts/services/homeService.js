"use strict";

angular.module('sureAuditAdminApp')
	.service('homeService', function ($http) {
		
		this.getCounts = function(){
			var request = {
				method: 'GET',
				url: 'https://sureaudit-dev.propelics.com/api/v1/Counts',
				headers: {
					'Authorization': 'token',
					'Accept': 'application/json'
				}
			}

	    	$http(request).then(function success(responce){
		  		console.log(responce);
		  	},function error(responce){
		  		console.log(responce);
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