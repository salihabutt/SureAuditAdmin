'use strict';

angular.module('sureAuditAdminApp')
	.controller('UserGroupPermissionsCtrl',  function ($state, $stateParams,$uibModal,userGroupService,SubjectGroupService,surveyGroupService, groupAssoicationModel) {
		var self = this,
		init = function () {
			self.id = $stateParams.id;
			self.userPermissions = angular.copy(groupAssoicationModel);
			self.userPermissionsClone = angular.copy(groupAssoicationModel);
			userGroupService.getUserGroupAssociation(self.id).then(function(response){
				if(response !== null){
					self.userPermissions = response;  //TODO after discussing with client
					self.userPermissions.TouchInfo.ModifiedDate = new Date();
				}
			},function () {
				// ERROR BLOCK
			});
			self.getSubjectGroups();
			self.getAuditGroups();
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
				userGroupService.deleteUserGroupAssociation(id);
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
		
		self.addEditPermission = function (action) {
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
					action: function(){
						return action;
					}
				}
			}).result.then(function () {
				
			});
		};
		
		self.navigate = function (state) {
			$state.go(state);
		};
		
		init();
	})
	.controller('AddEditPermissionsCtrl', function ($uibModalInstance,surveyGroups,subjectGroups,action) {
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
	  		}
	  	};
	  	self.ok = function () {
		    $uibModalInstance.close();
		};

		self.cancel = function () {
		    $uibModalInstance.dismiss('cancel');
		};
		
		self.next = function () {
			self.state = 'surgroup';
		}
		
		self.back = function () {
			self.state = 'subgroup';
		}

		init();
  }) ;