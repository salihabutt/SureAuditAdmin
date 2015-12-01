'use strict';

angular.module('sureAuditAdminApp')
.controller('SubjectGroupSettingsCtrl', function ($stateParams,SubjectGroupService){
	var self = this,
	init = function () {
		var id = $stateParams.id;
		SubjectGroupService.getSubjectGroup(id).then(function (response){
			self.subgrpSettings = response;
			self.subgrpSettings.TouchInfo.ModifiedDate = new Date();
		});
		self.initSubjectAttributes();
		
	};
	
	self.initSubjectAttributes = function () {
		self.subjectAttList = [];
		var subjectAtt = {};
		subjectAtt.label = '';
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
	
	self.checkIsDefault = function (index,event) {
		if(event.target.checked){
			for(var i=0; i < self.subjectAttList.length; i++){
				if(index !== i){
					self.subjectAttList[i].isDefault = false;
				}
			}
		}
	};
	init();
	
});