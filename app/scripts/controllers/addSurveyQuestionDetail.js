'use strict';

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
		self.imageCount = 0;
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
	
	self.updateImageCount = function (action) {
		if(action === 'down' && self.imageCount>0){
			self.imageCount--;
		}
		else if(action === 'up' && self.imageCount<4){
			self.imageCount++;
		}
	};
	
	self.bck = function () {
		$uibModalInstance.close(null);
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

  });