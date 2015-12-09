'use strict';

angular.module('sureAuditAdminApp')
	.controller('UserGroupPermissionsCtrl',  function ($state, $stateParams,$uibModal,userGroupService,SubjectGroupService,surveyGroupService, groupAssoicationModel, utilityService) {
		var self = this,
		init = function () {
			self.sortoptions = ['Most Recent', 'Least Recent', 'Permission (Ascending)', 'Permission (Descending)'];
			self.selectedSortOption = 'Most Recent';
			self.id = $stateParams.id;
			self.userGroup = $stateParams.usergroup;
			self.predicate = 'CreatedDate';
			self.reverse = true;
			self.userPermissionsList = [];
			userGroupService.getUserGroupAssociation(self.id).then(function(response){
				self.count = response.Count;
				self.getSubjectGroups();
				self.getAuditGroups();
				if(response.Count > 0){
					self.userPermissionsList = response.Data;  
					self.userGroup = {};
					self.userGroup.Name = response.Data[0].Name;
					self.userGroup.Key = response.Data[0].UserGroups[0];
					self.userGroup.TouchInfo={};
					self.userGroup.TouchInfo.ModifiedDate = new Date();
				} else if(self.userGroup === null){
						self.navigate('userGroups');
					}
				
			},function () {
				// ERROR BLOCK
			});		
		};
		
		self.order = function(val) {
			switch(val){
			case 'Permission (Ascending)':
				self.predicate = 'Permissions';
				self.reverse = false;
				break;
			case 'Permission (Descending)':
				self.predicate = 'Permissions';
				self.reverse = true;
				break;
			case 'Least Recent':
				self.predicate = 'CreatedDate';
				self.reverse = false;
				break;
			default:
				self.predicate = 'CreatedDate';
				self.reverse = true;
					
			}
		};

		self.deletePermission = function (id) {
			$uibModal.open({
				animation: true,
				templateUrl: 'views/deleteWarning.html',
				controller: 'delWarningCtrl',
				windowClass: 'changes-warning-modal',
				controllerAs: 'dwModal',
				resolve: {
					msg: function () {
						return 'Are you sure you want to delete the user group permission';
					}
				}
			}).result.then(function(){
				//delete user group permission
				userGroupService.deleteUserGroupAssociation(id).then(function (response) {
					console.log(response);
					var index = self.userPermissionsList.map(function(x){return x.Id;}).indexOf(id);
					self.userPermissionsList.splice(index,1);
					self.count--;
				});
			});
		};
		
		self.getAuditGroups = function () {
			surveyGroupService.getDataGroup().then(function(response){
				self.surveyGroups = response.Data;
			});
		};
		
		self.getSubjectGroups = function () {
			SubjectGroupService.getDataGroup().then(function (response) {
				self.subjectGroups = response.Data;
			});
		};
		
		self.addEditPermission = function (action,index) {
			$uibModal.open({
				animation: true,
				templateUrl: 'addEditPermissions.html',
				controller: 'AddEditPermissionsCtrl',
				controllerAs: 'ugpModal',
				windowClass: 'permissions-modal',
				resolve: {
					surveyGroups: function () {
						return self.surveyGroups;
					},
					subjectGroups: function () {
						return self.subjectGroups;
					},
					action: function (){
						return action;
					},
					item: function () {
						return index===null?null:self.userPermissionsList[index];
					}
				}
			}).result.then(function (userGroupPermission) {
				var userPermission = angular.copy(groupAssoicationModel);
				userPermission.Name = self.userGroup.Name;
				userPermission.UserGroups.push(self.userGroup.Key);
				userPermission.SubjectGroups.push(userGroupPermission.subjectGroup);
				userPermission.AuditGroups.push(userGroupPermission.surveyGroup);
				userPermission.Permissions.push(userGroupPermission.permission);
				if(action === 'add'){	
					userGroupService.saveUserGroupAssociation(userPermission).then(function (response) {
						console.log(response);
						userPermission.Id = response.Id;
						self.userPermissionsList.push(userPermission);
						self.count++;
					});
					
				} else {
					userPermission.TouchInfo.ModifiedDate = new Date();
					userPermission.TouchInfo.ModifiedByUserId = utilityService.getUserProfile()['p:userid'];
					userPermission.TouchInfo.CreateDate = self.userPermissionsList[index].TouchInfo.CreateDate;
					userPermission.TouchInfo.CreatedByUserId = self.userPermissionsList[index].TouchInfo.CreateByUserId;
					userPermission.Id = self.userPermissionsList[index].Id;
					userGroupService.updateUserGroupAssociation(userPermission).then(function (response) {
						console.log(response);
						self.userPermissionsList[index] = userPermission;
					});
				}
			});
		};
		
		self.navigate = function (state) {
			$state.go(state);
		};
		
		init();
	})
	.controller('AddEditPermissionsCtrl', function ($uibModalInstance,surveyGroups,subjectGroups,action,item) {
	  	var self = this,
	  	init = function () {
	  		self.subject = 'Add Permissions';
	  		self.surveyGroups = surveyGroups;
	  		self.subjectGroups = subjectGroups;
	  		self.state = 'subgroup';
	  		self.selectedSurGroup = null;
	  		self.selectedSubGroup = null;
	  		self.permissionSwitch = false;
	  		if(action === 'edit'){
	  			self.subject = 'Edit Permissions';
	  			self.selectedSubGroup = item.SubjectGroups[0].Id;
	  			self.selectedSurGroup = item.AuditGroups[0].Id;
	  			self.permissionSwitch = item.Permissions[0]==='Read'?false:true;
	  		}
	  	};
	  	self.save = function () {
	  		var userGroupPermission = {};
	  		userGroupPermission.subjectGroup = {};
	  		userGroupPermission.surveyGroup = {};
	  		var subjectGroup = self.subjectGroups[self.subjectGroups.map(function(x) {return x.Id; }).indexOf(self.selectedSubGroup)];
	  		userGroupPermission.subjectGroup.Id = subjectGroup.Id;
	  		userGroupPermission.subjectGroup.Key = subjectGroup.Key;
	  		userGroupPermission.subjectGroup.Name = subjectGroup.Name;
	  		
	  		var suveyGroup = self.surveyGroups[self.surveyGroups.map(function(x){return x.Id;}).indexOf(self.selectedSurGroup)];
	  		userGroupPermission.surveyGroup.Id = suveyGroup.Id;
	  		userGroupPermission.surveyGroup.Key = suveyGroup.Key;
	  		userGroupPermission.surveyGroup.Name = suveyGroup.Name;
	  		userGroupPermission.permission = self.permissionSwitch?'Create':'Read';
		    $uibModalInstance.close(userGroupPermission);
		};

		self.cancel = function () {
		    $uibModalInstance.dismiss('cancel');
		};
		
		self.next = function () {
			self.state = 'surgroup';
		};
		
		self.back = function () {
			self.state = 'subgroup';
		};

		init();
  }) ;