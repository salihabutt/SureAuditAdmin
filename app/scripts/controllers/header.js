'user strict';


angular.module('sureAuditAdminApp')
	.controller('headerCtrl',  function ($state) {
		var self = this;
		
		self.getProfile = function(){
			debugger;
			$state.go('profile');
		}

	})