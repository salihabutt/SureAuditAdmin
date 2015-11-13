'use strict';

angular.module('sureAuditAdminApp')
	.factory('surveyModel', function (utilityService) {
		
		var surveyModelFactory = {};
		var surveyModel = {
				  CustomerId: utilityService.getUserProfile()['p:custid'],
				  CustomerKey: utilityService.getUserProfile()['p:custkey'],
				  Key: '',
				  Name: '',
				  QuestionCount: 0,
				  Sections: [],
				  TouchInfo: {
					  CreatedDate:  new Date(),
					  ModifiedDate: new Date()
				  }
					  
			};
		var section = {
				MasterId: null,
				Id: null,
				RandomSet: [],
				Label: '',
				Name: '',
				Description: '',
				IsScored: null,		
				Weight: 0.0,			
				IsVisible: true,		
				QuestionCount: 0,
				SubSections: [],
				Questions: []

		};
		
		var question = {
				MasterId: null,
				TypeKey	: '',
				Id: null,					
				RandomSet: null,			
				Label: '',
				Name: '',
				Text: '',		
				Hint: null,			
				PointsAllowed: 0.0,					
				IsRequired: true,			
				IsVisible: true,				
				IsScored: false,
				Branches: [],
				CommentHint: null,
				IsCommentRequired: null,
				IsImagesRequired: null,
	            DefaultValue: null,
                UndesireableValue: null,
                AllowableValues: null,
                MinImagesAllowed: null,
                MaxImagesAllowed: null,
                ResponseRatios: {}

		}
		
		surveyModelFactory.surevyModel = surveyModel;
		surveyModelFactory.section = section;
		surveyModelFactory.question = question;
		
		return surveyModelFactory;
	});