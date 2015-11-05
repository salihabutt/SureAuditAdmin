'use strict';


angular.module('sureAuditAdminApp')
	.controller('headerCtrl',  function ($state, authService) {
		var self = this;
		self.expandQuesMenu = false;
		self.getProfile = function () {
			$state.go('profile');
		};
		
		self.logout = function () {
			authService.logOut();
		};

		self.navigate = function (view) {
			switch (view) {
			case 'HOME': 
				$state.go('home');
				break;
			case 'MQUESTION':
				$state.go('masterQuestion');
				break;
			}
		};
	
});