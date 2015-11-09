'use strict';

angular.module('sureAuditAdminApp')
	.factory('surveyModel', function (utilityService) {
		
			return {
				  CustomerId: utilityService.getUserProfile()['p:custid'],
				  CustomerKey: utilityService.getUserProfile()['p:custkey'],
				  Key: '',
				  Name: '',
				  SubTitle: '',
				  About: '',
				  Starts: "2015-09-25T09:06:18.4091845Z",
				  Published: null,
				  IsScored: true,
				  MaxScore: 10.0,
				  QuestionCount: 0,
				  Sections: []
					  
			};
	});