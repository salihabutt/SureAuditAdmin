'use strict';

angular.module('sureAuditAdminApp')
.controller('SubjectGroupSettingsCtrl', function ($stateParams,SubjectGroupService){
	var self = this,
	init = function () {
		var id = $stateParams.id;
		self.initSubjectAttributes();
		self.initProfileAttributes();
		self.types = ['Email','Phone','Other'];
		SubjectGroupService.getSubjectGroup(id).then(function (response){
			self.subgrpSettings = response;
			self.subgrpSettings.TouchInfo.ModifiedDate = new Date();
			if(self.subgrpSettings.SortOptions != null){
				self.popuplateSubjectAtt();
			}
		});
	
		
		
	};
	
	self.initSubjectAttributes = function () {
		self.subjectAttList = [];
		var subjectAtt = {};
		subjectAtt.order = '';
		subjectAtt.Key = '';
		subjectAtt.Name = null;
		subjectAtt.Field = null;
		subjectAtt.isDefault = false;
		subjectAtt.sortOption = false;
		self.subjectAttList.push(angular.copy(subjectAtt));
		self.subjectAttList.push(angular.copy(subjectAtt));
		self.subjectAttList.push(angular.copy(subjectAtt));
		self.subjectAttList.push(angular.copy(subjectAtt));
	};
	
	self.popuplateSubjectAtt = function () {
		for(var i=0;i<self.subgrpSettings.SortOptions.length;i++){
			var subjectAtt = {};
			subjectAtt.order = i;
			subjectAtt.Key = '';
			subjectAtt.Name = self.subgrpSettings.SortOptions[i].Name;
			subjectAtt.Field = null;
			subjectAtt.isDefault = self.subgrpSettings.SortOptions[i].isDefault;
			subjectAtt.sortOption = false;	
			self.subjectAttList[i] = subjectAtt;
		}
		console.log(self.subjectAttList);
	}
	
	self.initProfileAttributes = function () {
		self.profileAttList = [];
		var profileAtt = {};
		profileAtt.label = '';
		profileAtt.order = '';
		profileAtt.key = '';
		profileAtt.type = null;
		self.profileAttList.push(angular.copy(profileAtt));
		self.profileAttList.push(angular.copy(profileAtt));
		self.profileAttList.push(angular.copy(profileAtt));
		self.profileAttList.push(angular.copy(profileAtt));
	}
	
	self.checkIsDefault = function (index,event) {
		if(event.target.checked){
			for(var i=0; i < self.subjectAttList.length; i++){
				if(index !== i){
					self.subjectAttList[i].isDefault = false;
				}
			}
		}
	};
	
	self.saveSubGrpSetting = function () {
		
	};
	
	self.saveProfileAtt = function () {
		//for(var i=0;i<)
	};
	init();
	
});