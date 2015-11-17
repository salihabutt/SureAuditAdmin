'use strict';


angular.module('sureAuditAdminApp')
	.controller('SurveyCtrl',  function ($state, $uibModal,$stateParams, surveyService, utilityService) {
		var self = this,
		init = function () {
			surveyService.getData().then(function(response){
				self.data = response.Data;
			},function(){

			});
		};
		self.navigate = function () {
			$state.go('addSurvey');
		};
		
		self.editSurvey = function (id) {
			$state.go('addSurvey',{
			      id: id
		})
		};
		self.unpublish = function (index) {
			self.data[index].Published = null;
			var data = self.data[index];
			data.TouchInfo = self.getTouchInfo();
			surveyService.updateSurvey(data).then(function() {			
				
			},function () {
				// ERROR block
			});
		};
		
		self.publish = function (index) {
			self.data[index].Published = new Date();
			var data = self.data[index];
			data.TouchInfo = self.getTouchInfo();
			surveyService.updateSurvey(data).then(function () {			

			},function () {
				// ERROR block
			});
		};
		
		self.duplicate = function (index) {
			var requestedData = angular.copy(self.data[index]);
			requestedData.Key = utilityService.guid();
			requestedData.Published = null;
			requestedData.Id = null;
			requestedData.ResponseCount = 0;
			requestedData.TouchInfo = self.getTouchInfo();
			requestedData.TouchInfo.CreatedDate = new Date();
			requestedData.TouchInfo.CreatedByUserId = utilityService.getUserProfile()['p:userid'];
			surveyService.saveSurvey(requestedData).then(function () {			
				self.data.push(requestedData);
			},function () {
				// ERROR block
			});
		};

		self.getTouchInfo = function () {
			var touchInfo = {};
			touchInfo.ModifiedDate = new Date();
			touchInfo.ModifiedByUserId = utilityService.getUserProfile()['p:userid'];
			return touchInfo;
		};
		
		self.deleteSurvey = function (index) {
			if(self.data[index].ResponseCount !==null && self.data[index].ResponseCount>0){
			 $uibModal.open({
				  animation: true,
				  templateUrl: 'deleteSurveyWarning.html',
				  controller: 'deleteWarningCtrl',
				  windowClass: 'survey-warning-modal',
				  controllerAs: 'dwCtrl'
			  });
			}else {
				  $uibModal.open({
					  animation: true,
					  templateUrl: 'surveyDeleteConfirm.html',
					  controller: 'deleteConfirmCtrl',
					  windowClass: 'survey-warning-modal',
					  controllerAs: 'dcCtrl',
				  }).result.then(function(){						
						self.deleteSurveyById(index);
				  });			
			}
		};
		
		self.deleteSurveyById = function (index) {
			surveyService.deleteSurvey(self.data[index].Id).then(function(){
				self.data[index].Status = 'Deleted';
			},function(){
				// error block
			});
		};
		init();
	})
	.controller('deleteWarningCtrl', function ($uibModalInstance) {
		var self = this;
		self.ok = function () {
			$uibModalInstance.dismiss('cancel');	
		};

	})
	.controller('deleteConfirmCtrl', function ($uibModalInstance) {
		var self = this;
		self.ok = function () {
			$uibModalInstance.close();
		};
		self.cancel = function () {
			$uibModalInstance.dismiss('cancel');
		};
	});