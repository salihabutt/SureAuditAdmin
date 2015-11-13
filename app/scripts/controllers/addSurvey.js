'use strict'

angular.module('sureAuditAdminApp')
.controller('AddEditSurveyCtrl', function ($stateParams, $uibModal, surveyModel, utilityService, masterQuestionService) {
	var self = this,
	init = function () {
		self.auditDefinition = {};
		self.questionList = {};
		self.editSurvey = false;
		self.tab = 'ES';
		self.name = '';
		if ($stateParams.action === 'add') {
			self.auditDefinition = angular.copy(surveyModel.surevyModel);
			var section = angular.copy(surveyModel.section);
			self.auditDefinition.Sections.push(section);
			self.auditDefinition.Key = utilityService.guid;
		}
		
		self.getAllQuestion();
	};

	self.selectedTab = function (tab) {
		switch(tab)
		{
			case 'ES':
				self.tab = 'ES';
				break;
			case 'SS':
				self.tab = 'SS';
				break;
			case 'SmS':
				self.tab = 'SmS';
				break;
			defualt :
				self.tab = 'ES';
				break;
		}
	}
	
	self.getAllQuestion = function () {
		masterQuestionService.getData().then(function (response){
			self.questionList = response;
		}, function (){
			//TODO ERROR block
		});
	}
	self.addQuestion = function () {
		$uibModal.open({
			animation: true,
			templateUrl: 'addSurveyQuestion.html',
			controller: 'AddSurveyQuestionCtrl',
			windowClass: 'survey-questions-modal',
			controllerAs: 'mqModal',
			resolve: {
				mq: function () {
					return self.questionList;
				}
			}
		})
	};
	
	self.addSurvey = function () {
		var section = angular.copy(surveyModel.section);
		self.auditDefinition.Sections.push(section);
	};
	
	self.orderSection = function (index, action, type) {
		switch(type){
		case 'section':
			if(self.auditDefinition.Sections.length > 1 && action === 'down'){
				self.sortDown(self.auditDefinition.Sections,index);
			}
			else if(self.auditDefinition.Sections.length > 1 && action === 'up'){
				self.sortUp(self.auditDefinition.Sections,index);
			}
			break;
			
		}
	};
	
	self.sortUp = function (array,index) {
		var temp = array[index];
		array[index] = array[index-1];
		array[index-1] = temp;
	};
	
	self.sortDown = function (array,index) {
		var temp = array[index];
		array[index] = array[index+1];
		array[index+1] = temp;
	};
	
	init();
})
.controller('AddSurveyQuestionCtrl', function ($uibModalInstance, mq){
	var self = this,
	init = function () {
		self.questions = mq;
	
	};
	
	self.cancel = function () {
		$uibModalInstance.dismiss('cancel');
	}
	init();
	
});
