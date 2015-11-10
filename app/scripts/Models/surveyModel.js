'use strict';

angular.module('sureAuditAdminApp')
	.factory('surveyModel', function (utilityService) {
		
			return {
				  CustomerId: utilityService.getUserProfile()['p:custid'],
				  CustomerKey: utilityService.getUserProfile()['p:custkey'],
				  Key: '',
				  Name: '',
				  Sections: []
					  
			};
	});