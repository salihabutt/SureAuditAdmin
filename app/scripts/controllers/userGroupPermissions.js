'use strict';

angular.module('sureAuditAdminApp')
	.controller('UserGroupPermissionsCtrl',  function ($state, $stateParams,$uibModal,userGroupService) {
		var self = this,
		init = function () {
			self.id = $stateParams.id;
			userGroupService.getUserGroup(self.id).then(function(response){
			},function () {
				// ERROR BLOCK
			});
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
						return 'Are you sure you want to delete the user group permissi';
					}
				}
			}).result.then(function(){
			});
		};
		
		init();
	});