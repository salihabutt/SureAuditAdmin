'use strict';


angular.module('sureAuditAdminApp')
	.controller('surveyGroupsCtrl',  function (surveyGroupService, $uibModal, $state) {
		var self = this,
		init= function () {
			surveyGroupService.getDataGroup().then(function(response){
				self.data = response.Data;
			},function(){});
		};

		self.navigate = function () {
			$state.go('addSurveyGroup',{
			      id: ''
			});
		};
		
		self.editSurvey = function (id) {
			$state.go('addSurveyGroup',{
			      id: id
			});
		};

		self.deleteSurvey = function (index) {
			if(self.data[index].Audits.length > 0 && self.data[index].ParentGroup === null){ 
			 $uibModal.open({
				  animation: true,
				  templateUrl: 'surveyDeleteConfirm.html',
				  controller: 'deleteConfirmCtrl',
				  windowClass: 'survey-warning-modal',
				  controllerAs: 'dcCtrl'
			  }).result.then(function(){						
					self.deleteSurveyById(index);
				});
			}else {
			  $uibModal.open({
				  animation: true,
				  templateUrl: 'deleteSurveyWarning.html',
				  controller: 'deleteWarningCtrl',
				  windowClass: 'survey-warning-modal',
				  controllerAs: 'dwCtrl',
			  });	
			}		
		};

		self.deleteSurveyById = function (index) {
			console.log(self.data[index].Status);
			surveyGroupService.deleteSurveyGroup(self.data[index].Id).then(function(){
				self.data[index].Status = 'Deleted';
			},function(){
				// error block
			});
		};

		init();
}).controller('deleteWarningCtrl', function ($uibModalInstance) {
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