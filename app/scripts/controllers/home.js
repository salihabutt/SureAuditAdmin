'use strict';


angular.module('sureAuditAdminApp')
	.controller('HomeCtrl',  function ($state, homeService, utilityService) {
		var self = this,
		init = function () {
			self.getProfile = utilityService.getUserProfile();
			homeService.getCounts().then(function (response){
				self.data = {};
				self.data = response;
			}, function (){
				//TODO Error BLOCK
			});
		};
		
		self.navigate = function (type) {
			$state.go(type);
		};
		
		init();
	
});