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
			        HistoryInNew: false,
			        AuditDates: false
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
				Questions: [],
				QuestionSum:0 // we exclude this on saving audit definition
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
				Status: 'OK',
				CommentHint: null,
				CommentRequired: null,
				ImagesRequired: null,
	            DefaultValue: null,
                UndesireableValue: null,
                AllowableValues: null,
                MinImagesAllowed: null,
                MaxImagesAllowed: null,
                ResponseRatios: [],
                MinResponseLength: null,
                MaxResponseLength: null,
                LowerValueLimitInclusive: null,
                UpperValueLimitExclusive: null

		};
		
		var branch = {
				Key: null,
				Questions: [],
				Type: null,
				LowerValueLimitInclusive: null,
				UpperValueLimitExclusive: null,
				AllowableValues: [],
				IsCommentRequired: null,
				CommentHint: null,
				IsImagesRequired: null,
				MaxImagesAllowed: null,
				ImagesHint: null,
				IsActionItemRequired: null
		};
		
		var allowableValue = {
				Key: null,
				Label: null,
				Value: null,
				IsDefault: null,
				IsUndesireable: null
		};
		
		surveyModelFactory.surevyModel = surveyModel;
		surveyModelFactory.signature = signature;
		surveyModelFactory.section = section;
		surveyModelFactory.question = question;
		surveyModelFactory.branch = branch;
		surveyModelFactory.allowableValue = allowableValue;
		
		return surveyModelFactory;
	});