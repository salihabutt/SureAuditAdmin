'user strict';


angular.module('sureAuditAdminApp')
	.controller('profileCtrl',  function ($state) {
		var self = this;
		
		self.data = {
			'name' : 'testuser',
			'contactno' : '000-000-0000',
			'email' : 'testuser@test.com'
		}

	})