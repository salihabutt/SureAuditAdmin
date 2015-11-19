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
				  Starts: null,
				  Ends: null,
				  About: '',
				  IsScored: false,
				  MaxScore: 10.0,
				  ShowPrevious: {
			        Comment: false,
			        Scores: false,
			        Responses: false,
			        HistoryInNew: false
			      },
			      SummaryDisplayFlags: [],
			      Signatures: [],
				  TouchInfo: {
					  CreatedDate:  new Date(),
					  ModifiedDate: new Date()
				  }
					  
			};


		var  signature = {
				  Key: '',
				  Source: '',
				  Description: '',
				  Header: '',
				  Required: false,
				  CommentRequired: 0
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
				IsRequired: false,			
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
                ResponseRatios: [],
                MinResponseLength: 0,
                MaxResponseLength: 0

		};
		
		var branch = {
				Questions: []
		};
		
		surveyModelFactory.surevyModel = surveyModel;
		surveyModelFactory.signature = signature;
		surveyModelFactory.section = section;
		surveyModelFactory.question = question;
		surveyModelFactory.branch = branch;
		
		return surveyModelFactory;
	});