'use strict'

angular.module('sureAuditAdminApp')
.controller('AddEditSurveyCtrl', function ($stateParams, $uibModal, surveyModel, utilityService, masterQuestionService) {
	var self = this,
	init = function () {
		self.auditDefinition = {};
		self.questionList = {};
		self.editSurvey = false;
		if ($stateParams.action === 'add') {
			self.auditDefinition = angular.copy(surveyModel);
			self.auditDefinition.Key = utilityService.guid;
		}
		
		self.getAllQuestion();
	};
	
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
