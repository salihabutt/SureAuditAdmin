'user strict';


angular.module('sureAuditAdminApp')
	.controller('profileCtrl',  function (utilityService) {
		var self = this,
		init= function () {
			self.userProfile = {};
			self.userProfile = utilityService.getUserProfile();
			console.log(self.userProfile);
		};
		
		
		init();

	})