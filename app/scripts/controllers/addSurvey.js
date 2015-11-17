'use strict';

angular.module('sureAuditAdminApp')
.controller('AddEditSurveyCtrl', function ($stateParams, $uibModal, surveyModel, utilityService, masterQuestionService, surveyService) {
	var self = this,
	init = function () {
		self.auditDefinition = {};
		self.questionList = {};
		self.editSurvey = false;
		self.tab = 'ES';
		self.showFlags = false;

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
			default:
				self.tab = 'ES';
				break;
		}
	};
	
	self.getAllQuestion = function () {
		masterQuestionService.getData().then(function (response){
			self.questionList = response;
		}, function (){
			//TODO ERROR block
		});
	};
	self.addQuestion = function (pIndex) {
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
		}).result.then(function(question){
			self.auditDefinition.Sections[pIndex].Questions.push(question);
			self.auditDefinition.QuestionCount++;
		});
	};
	
	self.addSection = function (pIndex) {
		var section = angular.copy(surveyModel.section);
		if(pIndex === 0 || pIndex === self.auditDefinition.Sections.length-1){
			self.auditDefinition.Sections.push(section);
		}else{
			self.auditDefinition.Sections.splice(pIndex,0,section);
		}
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
	
	self.saveAuditDef = function () {
		surveyService.saveSurvey(self.auditDefinition).then(function (response) {			
			self.auditDefinition.Id = response.Id;
		},function () {
			// ERROR block
		});
	};
	
	init();
})
.controller('AddSurveyQuestionCtrl', function ($uibModalInstance, $uibModal, mq){
	var self = this,
	init = function () {
		self.questions = mq;
		self.selected = null;
		self.selctedQuestion = {};
	};
	
	self.cancel = function () {
		$uibModalInstance.dismiss('cancel');
	};
	
	self.setSelected = function (item) {
		self.selctedQuestion = item;
	};
	
	self.next = function () {
		$uibModal.open({
			animation: true,
			templateUrl: 'views/addSurveyQuestionDetail.html',
			controller: 'AddSurveyQuestionDetailCtrl',
			windowClass: 'survey-questiondetail-modal',
			controllerAs: 'sqdModal',
			resolve:{
				ques: function () {
					return self.selctedQuestion;
				}
			}
		}).result.then(function (question){
			$uibModalInstance.close(question);
		}, function (){
			$uibModalInstance.dismiss('cancel');
		});
	};
	init();
	
});
