'user strict';


angular.module('sureAuditAdminApp')
	.controller('headerCtrl',  function ($state, authService) {
		var self = this;
		self.expandQuesMenu = false;
		self.getProfile = function(){
			$state.go('profile');
		};
		
		self.logout = function () {
			authService.logOut();
		};
		
		self.goHome = function(){
			$state.go('home');
		};
});