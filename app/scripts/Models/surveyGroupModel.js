'use strict';

angular.module('sureAuditAdminApp')
	.factory('surveyGroupModel', function (utilityService) {
		
		var surveyGroupModelFactory = {};
		var surveyGroupModelDef = {
				  CustomerId: utilityService.getUserProfile()['p:custid'],
				  CustomerKey: utilityService.getUserProfile()['p:custkey'],
				  Key: '',
				  Name: '',
				  Status:'OK',
				  Audits: [],
				  TouchInfo: {
					  CreatedDate:  new Date(),
					  ModifiedDate: new Date()
				  }
				};
		

		surveyGroupModelFactory.surveyGroupModelDef = surveyGroupModelDef;

		return surveyGroupModelFactory;
	});