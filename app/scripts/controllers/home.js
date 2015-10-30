'user strict';


angular.module('sureAuditAdminApp')
	.controller('HomeCtrl',  function ($state,homeService) {
		var self = this,
		init = function () {
			homeService.getCounts().then(function (response){
				self.data = {};
				self.data = response;
			}, function (err){
				
			});
		};
		
		init();

		self.gotoSettingPage = function(){
			$state.go('appSetting');
		};

		self.goHome = function(){
			$state.go('home');
		};

	});