'user strict';


angular.module('sureAuditAdminApp')
	.controller('HomeCtrl',  function (homeService) {
		var self = this,
		init = function () {
			homeService.getCounts().then(function (response){
				self.data = {};
				self.data = response;
			}, function (err){
				
			});
		};
		
		init();

	})