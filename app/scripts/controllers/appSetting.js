'user strict';


angular.module('sureAuditAdminApp')
	.controller('appSettingCtrl',  function (appSettingService) {
		var self = this,
		init = function(){
			self.response = {};
			self.getSettings();
		};
		
		self.getSettings = function () {
			appSettingService.getSettings().then(function(response){
				self.response = response;
				console.log(JSON.stringify(self.response));

			}, function(err){
				console.log(err);
			});
		};
		self.updateSettings = function () {
			appSettingService.updateSettings(self.response).then(function(response){
				
			}, function (err) {
				
			})
		}
		init();

	})