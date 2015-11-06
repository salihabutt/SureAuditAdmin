'use strict';

angular.module('sureAuditAdminApp')
	.factory('masterQuestionModel', function (utilityService) {
		

			return {
				  CustomerId: utilityService.getUserProfile()['p:custid'],
				  CustomerKey: utilityService.getUserProfile()['p:custkey'],
				  Text: '',
				  TypeKey: '',
				  Key: '',
				  AllowableValues:[]
					  
			};
	});