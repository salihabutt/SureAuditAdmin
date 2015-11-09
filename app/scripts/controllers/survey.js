'use strict';


angular.module('sureAuditAdminApp')
	.controller('SurveyCtrl',  function ($state, $uibModal, surveyService, utilityService) {
		var self = this,
		init = function () {
			surveyService.getData().then(function(response){
				self.data = response.Data;
			},function(err){

			});
		};
		self.navigate = function () {
			$state.go('addSurvey')
		};
		self.unpublish = function (index) {
			self.data[index].Published = null;
			var data = self.data[index];
			data.TouchInfo.TouchInfo = new Date();
			surveyService.updateSurvey(data).then(function(response) {			
				
			},function () {
				// ERROR block
			});
		};
		
		self.publish = function (index) {
			self.data[index].Published = new Date();
			var data = self.data[index];
			data.TouchInfo.TouchInfo = new Date();
			surveyService.updateSurvey(data).then(function (response) {			

			},function () {
				// ERROR block
			});
		};
		
		self.duplicate = function (index) {
			var requestedData = angular.copy(self.data[index]);
			requestedData.Key = utilityService.guid();
			requestedData.Published = null;
			requestedData.Id = null;
			requestedData.TouchInfo = self.getTouchInfo() ;
			surveyService.saveSurvey(requestedData).then(function () {			
				self.data.push(requestedData);
			},function () {
				// ERROR block
			});
		};

		self.getTouchInfo = function () {
			var touchInfo = {};
			touchInfo.TouchInfo = new Date();
			touchInfo.CreatedDate = new Date();
			touchInfo.CreatedByUserId = utilityService.getUserProfile()['p:userid'];
		};
		
		self.deleteSurvey = function (index) {
			 $uibModal.open({
				  animation: true,
				  templateUrl: 'deleteSurveyWarning.html',
				  controller: 'deleteWarningCtrl',
				  windowClass: 'survey-warning-modal',
				  controllerAs: 'dwCtrl',
			  }).result.then(function(){ 
				  $uibModal.open({
					  animation: true,
					  templateUrl: 'surveyDeleteConfirm.html',
					  controller: 'deleteConfirmCtrl',
					  windowClass: 'survey-warning-modal',
					  controllerAs: 'dcCtrl',
				  }).result.then(function(){
						
						surveyService.deleteSurvey(self.data[index].Id).then(function(response){
							self.data[index].Status = 'Deleted';
						},function(){
							// error block
						});
				  });
				}, function (){
				
				});
		};
		init();
	})
	.controller('deleteWarningCtrl', function ($uibModalInstance) {
		var self = this;
		self.ok = function () {
			$uibModalInstance.dismiss('cancel');
		};
		self.cancel = function () {
			$uibModalInstance.close();
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