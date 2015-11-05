'use strict';

angular.module('sureAuditAdminApp')
	.factory('masterQuestionModel', function (utilityService) {
		
		var masterQuestionModel = {
				  CustomerId: utilityService.getUserProfile()['p:custid'],
				  CustomerKey: utilityService.getUserProfile()['p:custkey'],
				  TypeKey: '',
				  Key: '',
				  Name: '',
				  Text: '',
				  Hint: '',
				  ResponseFormat: ''
		};
		
		return masterQuestionModel;
	});