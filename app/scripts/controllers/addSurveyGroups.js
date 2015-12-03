'use strict';


angular.module('sureAuditAdminApp')
	.controller('AddSurveyGroupsCtrlCtrl',  function ($stateParams, $timeout, surveyGroupModel, surveyService, utilityService, surveyGroupService) {
		var self = this,
		init= function () {

			self.id = $stateParams.id;
			self.editSurvey = false;
			self.showMessage = false;
			self.getAllAudits = [];

			self.auditGroupDef = {};

			if (self.id === '') {
				self.auditGroupDef = angular.copy(surveyGroupModel.surveyGroupModelDef);		
				self.auditGroupDef.Key = utilityService.guid();
				self.auditGroupDefClone = angular.copy(self.auditGroupDef); // keep this line at end always
				console.log(self.auditGroupDef);
			}else{
				surveyGroupService.getSurveyGroup(self.id).then(function (response) {
					self.auditGroupDef = response;
					self.auditGroupDef.TouchInfo.ModifiedDate = new Date();
					self.auditGroupDef = angular.copy(self.auditGroupDef);  // keep this line at end always
				},function () {
					// ERROR block
				});
			}

			surveyService.getData().then(function (response) {
					debugger;
					if (self.id === ''){
						self.getAllAudits = response.Data;
					}else{

						self.getAllAudits = response.Data;
						
						for (var i = 0 ; i < response.Data.length ; i++) {
							for (var j = 0 ; j < self.auditGroupDef.Audits.length; j++) {
								if(response.Data[i].Id === self.auditGroupDef.Audits[j].Id){
									self.getAllAudits.splice(i , 1);
								}	
							}
						}
					}

					for (var i = 0 ; i < self.getAllAudits.length; i++) {
						self.getAllAudits[i].checked = false;
					};
					
				},function () {
					// ERROR block
				});
			};

		self.updateSurveyGroup = function(){
			for (var i = 0; i < self.getAllAudits.length; i++) {
				if(self.getAllAudits[i].checked === true){
					surveyGroupModel.auditsList.Id = self.getAllAudits[i].Id;
					surveyGroupModel.auditsList.Key = self.getAllAudits[i].Key;
					surveyGroupModel.auditsList.LastModified = self.getAllAudits[i].TouchInfo.ModifiedDate;
					surveyGroupModel.auditsList.Name = self.getAllAudits[i].Name;
					surveyGroupModel.auditsList.Published = self.getAllAudits[i].Published;
					surveyGroupModel.auditsList.QuestionCount = self.getAllAudits[i].QuestionCount;
					surveyGroupModel.auditsList.SubTitle = self.getAllAudits[i].SubTitle;

					self.auditGroupDef.Audits.push(surveyGroupModel.auditsList)
					
				}
			}

			for (var i = 0 ; i < self.getAllAudits.length; i++) {
				debugger;
				if(self.getAllAudits[i].checked === true){
					self.getAllAudits.splice(i , 1)
				}
			};

			debugger;

		};
		


		self.saveSurGroup = function(){
			if(self.id === ''){ //ADD SURVEY group
				surveyGroupService.saveSurveyGroup(self.auditGroupDef).then(function (response) {			
					self.auditGroupDef.Id = response.Id;
					self.id = response.Id;
				},function () {
					// ERROR block
				});
			}
			else{ //EDIT SURVEY group
				debugger;
				surveyGroupService.updateSurveyGroup(self.auditGroupDef).then(function (response) {			
					self.auditGroupDef.Id = response.Id;
					self.id = response.Id;
					self.showMessage = true;
					$timeout(function () {
						self.showMessage = false;
					},3000);
				},function () {
				// ERROR block
				});
			}
		};

		init();
});