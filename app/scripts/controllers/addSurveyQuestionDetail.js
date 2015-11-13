'use strict'

angular.module('sureAuditAdminApp')
.controller('AddSurveyQuestionDetailCtrl', function ($uibModal, $uibModalInstance, ques, surveyModel) {
	var self = this,
	init = function () {
		self.defaultRespList = ['Yes','No'];
		self.defaultResp = '';
		self.undesiredRespList = ['Yes','No'];
		self.undesiredResp = '';
		self.question = angular.copy(surveyModel.question);
		self.question.MasterId = ques.Id;
		self.question.Text = ques.Text;
		self.question.TypeKey = ques.TypeKey;
		self.question.Label = ques.Label;
		self.question.Name = ques.Name;
		self.question.Id = null;
	};
	

	
	self.cancel = function () {
		$uibModal.open({
			animation: false,
			templateUrl: 'changesWarning.html',
			controller: 'questionChangesWarningCtrl',
			windowClass: 'changes-warning-modal',
			controllerAs: 'scwModal',
		}).result.then(function () {
			$uibModalInstance.dismiss('cancel');
		}, function(){
			
		});
	};
	
	self.ok = function () {
		$uibModalInstance.close(self.question);
	};
	
	init();
})
   .controller('questionChangesWarningCtrl', function ($uibModalInstance) {

	  	var self = this;
	  	self.ok = function () {
	  		$uibModalInstance.close();
		};

		self.cancel = function () {
		    $uibModalInstance.dismiss('cancel');
		};

  });;