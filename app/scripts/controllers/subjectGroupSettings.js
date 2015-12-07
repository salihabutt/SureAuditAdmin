'use strict';

angular.module('sureAuditAdminApp')
.controller('SubjectGroupSettingsCtrl', function ($state, $stateParams, $timeout, SubjectGroupService){
	var self = this,
	init = function () {
		var id = $stateParams.id;
		self.initSubjectAttributes();
		self.initProfileAttributes();
		self.types = ['Email','Phone','Other'];
		self.selectedTab = 'GS';
		self.disableSave = true;
		self.showMessage = false;
		SubjectGroupService.getSubjectGroup(id).then(function (response){
			self.subgrpSettings = response;
			self.subgrpSettings.TouchInfo.ModifiedDate = new Date();
			self.subgrpSettingsClone = angular.copy(self.subgrpSettings);
			if(self.subgrpSettings.SortOptions !== null){
				self.popuplateSubjectAtt();
			}
			if(self.subgrpSettings.ProfileAttributes!== null){
				self.populateProfileAtt();
			}
		});
	
		
		
	};
	
	self.initSubjectAttributes = function () {
		self.subjectAttList = [];
		for(var i=1; i<5; i++){
			var subjectAtt = {};
			subjectAtt.order = i;
			subjectAtt.Key = '';
			subjectAtt.Name = null;
			subjectAtt.Field = null;
			subjectAtt.isDefault = false;
			subjectAtt.sortOption = false;
			self.subjectAttList.push(subjectAtt);
		}
		self.subjectAttListClone = angular.copy(self.subjectAttList);
	};
	
	self.popuplateSubjectAtt = function () {
		for(var i=0;i<self.subgrpSettings.SortOptions.length;i++){
			var subjectAtt = {};
			subjectAtt.order = i+1;
			subjectAtt.key = self.subgrpSettings.SortOptions[i].Key;
			subjectAtt.name = self.subgrpSettings.SortOptions[i].Name;
			subjectAtt.field = null;
			subjectAtt.isDefault = self.subgrpSettings.SortOptions[i].isDefault;
			subjectAtt.sortOption = true;	
			self.subjectAttList[i] = subjectAtt;
		}
		console.log(self.subjectAttList);
		self.subjectAttListClone = angular.copy(self.subjectAttList);
	};
	
	self.populateProfileAtt = function () {
		for(var i=0;i<self.subgrpSettings.ProfileAttributes.length;i++){
			var profileAtt = {};
			profileAtt.label = self.subgrpSettings.ProfileAttributes[i].Label;
			profileAtt.order = i+1;
			profileAtt.key = self.subgrpSettings.ProfileAttributes[i].Key;
			profileAtt.type = self.subgrpSettings.ProfileAttributes[i].Type;
			self.profileAttList[i] = profileAtt;
		}
		self.profileAttListClone = angular.copy(self.profileAttList);
	};
	
	self.initProfileAttributes = function () {
		self.profileAttList = [];
		for(var i=1; i<5; i++){
			var profileAtt = {};
			profileAtt.label = '';
			profileAtt.order = i;
			profileAtt.key = '';
			profileAtt.type = null;
			self.profileAttList.push(profileAtt);
		}
		self.profileAttListClone = angular.copy(self.profileAttList);
	};
	
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
		self.saveSubAtt();
		self.saveProfileAtt();
		SubjectGroupService.updateSubjectGroup(self.subgrpSettings).then(function (response) {
			console.log(response);
			self.showMessage = true;
			$timeout(function () {
				self.showMessage = false;
				self.disableSave = true;
			},3000);
		});
	};
	
	self.saveSubAtt = function () {
		self.subgrpSettings.SortOptions = [];
		self.subjectAttList.sort(function(a, b) { return a.order - b.order; });
		for(var i=0;i<self.subjectAttList.length;i++){
			if(self.subjectAttList[i].sortOption){
				var obj = {};
				obj.Key = self.subjectAttList[i].key;
				obj.IsDefault = self.subjectAttList[i].isDefault;
				self.subgrpSettings.SortOptions.push(obj);
			}
		}
	};
	
	self.saveProfileAtt = function () {
		self.subgrpSettings.ProfileAttributes=[];
		self.profileAttList.sort(function(a, b) { return a.order - b.order; });
		for(var i=0;i<self.profileAttList.length;i++){
			var obj = {};
			obj.Key = self.profileAttList[i].key;
			obj.Label = self.profileAttList[i].label;
			obj.Type = self.profileAttList[i].type;
			self.subgrpSettings.ProfileAttributes.push(obj);
		}
	};
	
	self.updateModel = function () {
		self.disableSave = true;
		if(!angular.equals(self.subgrpSettings,self.subgrpSettingsClone)){
			self.disableSave = false;
		} else if(!angular.equals(self.subjectAttList,self.subjectAttListClone)){
			self.disableSave = false;
		} else if(!angular.equals(self.profileAttList,self.profileAttListClone)){
			self.disableSave = false;
		}
	};
	
	self.navigate = function (view){
		$state.go(view);
	};
	
	init();
	
});