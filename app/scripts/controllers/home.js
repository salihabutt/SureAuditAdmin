'user strict';


angular.module('sureAuditAdminApp')
	.controller('HomeCtrl',  function (homeService) {
		var self = this
		init = function () {
			var response = homeService.getCounts();
		}
		
		init();

	})