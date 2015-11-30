'use strict';

angular.module('sureAuditAdminApp')
	.controller('UserGroupPermissionsCtrl',  function ($state, $stateParams,$uibModal,userGroupService,SubjectGroupService,surveyGroupService) {
		var self = this,
		init = function () {
			self.id = $stateParams.id;
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
		

		self.deletePermission = function () {
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
		
		self.AddEditPermission = function () {
			$uibModal.open({
				animation: true,
				templateUrl: 'views/permissionPopup.html',
				controller: 'permissionPopupCtrl',
				controllerAs: 'ugpModal',
				windowClass: 'permissions-modal',
				resolve: {
					surveyGroups: function () {
						return self.surveyGroups
					},
					subjectGroups: function () {
						return self.subjectGroups;
					}
				}
			}).result.then(function () {
				
			})
		};
		
		init();
	})
	.controller('permissionPopupCtrl', function ($uibModalInstance,surveyGroups,subjectGroups) {
	  	var self = this,
	  	init = function () {
	  		self.subject = 'Add Permissions';
	  		self.surveyGroups = surveyGroups;
	  		self.subjectGroups = subjectGroups;
	  		self.selected = null;
	  		self.permissionSwitch = false;
	  	};
	  	self.ok = function () {
		    $uibModalInstance.close();
		};

		self.cancel = function () {
		    $uibModalInstance.dismiss('cancel');
		};

		init();
  }) ;