'user strict';


angular.module('sureAuditAdminApp')
	.controller('appSettingCtrl',  function (appSettingService) {
		var self = this;
		
		init = function(){

			appSettingService.getSettings().then(function(response){
				self.data = [];
				self.data = response.Data;
				console.log(self.data);

			}, function(err){
				console.log(err);
			}); 
		}
		init();

	})