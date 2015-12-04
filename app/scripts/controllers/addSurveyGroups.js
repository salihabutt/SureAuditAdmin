'use strict';


angular.module('sureAuditAdminApp')
	.controller('AddSurveyGroupsCtrlCtrl',  function ($uibModal,$state, $stateParams, $timeout, surveyGroupModel, surveyService, utilityService, surveyGroupService) {
		var self = this,
		init= function () {

			self.id = $stateParams.id;
			self.editSurvey = false;
			self.showMessage = false;
			self.getAllAudits = [];
			self.isSaveDisabled = true;

			self.auditGroupDef = {};

			if (self.id === '') {
				self.auditGroupDef = angular.copy(surveyGroupModel.surveyGroupModelDef);		
				self.auditGroupDef.Key = utilityService.guid();
				self.auditGroupDefClone = angular.copy(self.auditGroupDef); // keep this line at end always
				console.log(self.auditGroupDef);
			}else{
				surveyGroupService.getSurveyGroup(self.id).then(function (response) {
					self.auditGroupDef = response;
					self.auditGroupDef.TouchInfo.ModifiedDate = new Date();
					self.auditGroupDef = angular.copy(self.auditGroupDef);  // keep this line at end always
					self.populateAudits();

				},function () {
					// ERROR block
				});
			}

			surveyService.getData().then(function (response) {
					if (self.id === ''){
						self.getAllAudits = response.Data;
						for (var i = 0 ; i < self.getAllAudits.length; i++) {
							self.getAllAudits[i].checked = false;
							self.getAllAudits[i].showInList = true;
						}
					}else{

						self.getAllAudits = response.Data;
						
						for (var i = 0 ; i < self.getAllAudits.length; i++) {
							self.getAllAudits[i].checked = false;
							self.getAllAudits[i].showInList = true;
						}

						for (var i = 0 ; i < response.Data.length ; i++) {
							for (var j = 0 ; j < self.auditGroupDef.Audits.length; j++) {
								if(response.Data[i].Id === self.auditGroupDef.Audits[j].Id){
									self.getAllAudits[i].showInList = false;
								}	
							}
						}
					}
				},function () {
					// ERROR block
				});
			};

		self.updateSurveyGroup = function(){
			for (var i = 0; i < self.getAllAudits.length; i++) {
				if(self.getAllAudits[i].checked === true && self.getAllAudits[i].showInList === true){
					var newAuditList = angular.copy(surveyGroupModel.auditsList);
					newAuditList.Id = self.getAllAudits[i].Id;
					newAuditList.Key = self.getAllAudits[i].Key;
					newAuditList.LastModified = self.getAllAudits[i].TouchInfo.ModifiedDate;
					newAuditList.Name = self.getAllAudits[i].Name;
					newAuditList.Published = self.getAllAudits[i].Published;
					newAuditList.QuestionCount = self.getAllAudits[i].QuestionCount;
					newAuditList.SubTitle = self.getAllAudits[i].SubTitle;
					newAuditList.order = newAuditList.Published==null?99999:0;

					self.auditGroupDef.Audits.push(newAuditList)
					self.getAllAudits[i].showInList = false;	
				}
			}

			self.updateModel();
		};
		

		self.deleteAudit = function(index){

			$uibModal.open({
				animation: true,
				templateUrl: 'delWarning.html',
				controller: 'delWarningCtrl',
				windowClass: 'changes-warning-modal',
				controllerAs: 'dwModal',
			}).result.then(function(){
				for (var i = self.getAllAudits.length - 1; i > -1; i--) {
				    if (self.getAllAudits[i].Id === index){
				        self.getAllAudits[i].showInList = true;
				    	self.getAllAudits[i].checked = false;
				    }
				}
				for (var i = self.auditGroupDef.Audits.length - 1; i > -1; i--) {
				    if (self.auditGroupDef.Audits[i].Id === index){
				 		self.auditGroupDef.Audits.splice(i, 1);
				 	}
				}
				self.updateModel();
			});
		};

		self.editAudit = function(index){
			$state.go('addSurvey',{
			      id: index
			});
			
		};

		self.updateModel = function () {
			self.isSaveDisabled = true;
			if(!angular.equals(self.auditGroupDef,self.auditGroupDefClone)){
				self.isSaveDisabled = false;
			} 
		};

		self.saveSurGroup = function(){
			self.auditGroupDef.Audits.sort(function(a, b) { return a.order - b.order; });
			console.log(self.auditGroupDef.Audits);
			/*
			if(self.id === ''){ //ADD SURVEY group
				surveyGroupService.saveSurveyGroup(self.auditGroupDef).then(function (response) {			
					self.auditGroupDef.Id = response.Id;
					self.id = response.Id;
					self.showMessage = true;
					$timeout(function () {
						self.showMessage = false;
					},3000);
				},function () {
					// ERROR block
				});
			}
			else{ //EDIT SURVEY group
				surveyGroupService.updateSurveyGroup(self.auditGroupDef).then(function (response) {			
					self.auditGroupDef.Id = response.Id;
					self.id = response.Id;
					self.showMessage = true;
					$timeout(function () {
						self.showMessage = false;
					},3000);
				},function () {
				// ERROR block
				});
			}*/
		};

		self.populateAudits = function () {
			for(var i=0;i<self.auditGroupDef.Audits.length;i++){
				if(self.auditGroupDef.Audits[i].Published != null){
					self.auditGroupDef.Audits[i].order = i+1;
				}else{
					self.auditGroupDef.Audits[i].order = 99999;
				}
			}
			
		};
		init();
}).controller('delWarningCtrl', function ($uibModalInstance, $uibModal){
	var self = this;
	
	self.ok = function () {
		$uibModalInstance.close();
	};
	
	self.cancel = function () {
		$uibModalInstance.dismiss('cancel');
	};
	
	
});