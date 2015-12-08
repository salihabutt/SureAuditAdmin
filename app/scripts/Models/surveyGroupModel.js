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


		var audits = {
			Id: "",
			Key: "",
			LastModified: "",
			Name: "",
			Published: "",
			QuestionCount: 0,
			SubTitle: "",
		};
		

		surveyGroupModelFactory.surveyGroupModelDef = surveyGroupModelDef;
		surveyGroupModelFactory.auditsList = audits;

		return surveyGroupModelFactory;
	});