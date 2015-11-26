'use strict';

angular.module('sureAuditAdminApp')
	.controller('UserGroupCtrl',  function ($state, userGroupService) {
		var self = this,
		init = function () {
			userGroupService.getData().then(function(response){
				self.userGroups = response.Data;
			},function () {
				// ERROR BLOCK
			});
		};
		
		self.navigate = function (id) {
			$state.go('userGroupPermission',{
				id: id
			});
		};
		
		init();
	});