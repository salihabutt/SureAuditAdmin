'use strict';


angular.module('sureAuditAdminApp')
	.controller('AddSurveyGroupsCtrlCtrl',  function ($stateParams, $timeout, surveyGroupModel, surveyService, utilityService, surveyGroupService) {
		var self = this,
		init= function () {

			self.id = $stateParams.id;
			self.editSurvey = false;
			self.showMessage = false;
			self.getAllAudits = {};

			self.auditGroupDef = {};

			if (self.id === '') {
				self.auditGroupDef = angular.copy(surveyGroupModel.surveyGroupModelDef);		
				self.auditGroupDef.Key = utilityService.guid;
				self.auditGroupDefClone = angular.copy(self.auditGroupDef); // keep this line at end always
				console.log(self.auditGroupDef);
			}else{
				surveyGroupService.getSurveyGroup(self.id).then(function (response) {
					console.log(response);
					self.auditGroupDef = response;
					self.auditGroupDef.TouchInfo.ModifiedDate = new Date();
					self.auditGroupDef = angular.copy(self.auditGroupDef);  // keep this line at end always
				},function () {
					// ERROR block
				});
			}

			surveyService.getData().then(function (response) {
					console.log(response);
					self.getAllAudits = response;
				},function () {
					// ERROR block
				});

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