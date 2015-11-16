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
		self.responseRatioOptions = [
		                             {
		                            	 label: 'Yes',
		                            	 active: false,
		                            	 value: 0	 
		                             },
		                             {
		                            	 label: 'No',
		                            	 active: false,
		                            	 value: 0
		                             }];
		                             
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
		for (var i=0;i<self.responseRatioOptions.length;i++){
			if(self.responseRatioOptions[i].active){
				var responseRatio = {};
				responseRatio.ratio = self.responseRatioOptions[i].value;
				responseRatio.valueMatch = self.responseRatioOptions[i].label;
				self.question.ResponseRatios.push(responseRatio);
			}
		}
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
		$uibModal.open({
			animation:false,
			templateUrl: 'bckWarning.html',
			controller: 'questionBackWarningCtrl',
			windowClass: 'changes-warning-modal',
			controllerAs: 'sbwModal',
		}).result.then(function () {
			$uibModalInstance.close(null);
		}, function(){
			
		});
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

  })
  
    .controller('questionBackWarningCtrl', function ($uibModalInstance) {

	  	var self = this;
	  	self.ok = function () {
	  		$uibModalInstance.close();
		};

		self.cancel = function () {
		    $uibModalInstance.dismiss('cancel');
		};

  });