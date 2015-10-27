'user strict';


angular.module('sureAuditAdminApp')
	.controller('HomeCtrl',  function (homeService) {
		
		this.data = homeService.getDumydata();

	})