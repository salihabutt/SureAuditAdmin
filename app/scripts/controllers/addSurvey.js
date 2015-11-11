'use strict'

angular.module('sureAuditAdminApp')
.controller('AddEditSurveyCtrl', function ($stateParams, $uibModal, surveyModel, utilityService) {
	var self = this,
	init = function () {
		self.auditDefinition = {};
		self.editSurvey = false;
		if ($stateParams.action === 'add') {
			self.auditDefinition = angular.copy(surveyModel);
			self.auditDefinition.Key = utilityService.guid;
		}
	};
	self.addQuestion = function () {
		$uibModal.open({
			animation: false,
			templateUrl: 'addSurveyQuestion.html',
			controller: 'AddSurveyQuestionCtrl',
			windowClass: 'survey-questions-modal',
			controllerAs: 'mqModal'
		})
	};
	init();
})
.controller('AddSurveyQuestionCtrl', function (){
	
	
});
