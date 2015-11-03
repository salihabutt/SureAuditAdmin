'use strict';


angular.module('sureAuditAdminApp')
	.controller('appSettingCtrl',  function ($timeout, appSettingService) {
		var self = this,
		init = function () {
			self.appSettings = {};
			self.appSettingClone = {};
			self.showMessage = false;
			self.disableSaveBtn = true;
			self.getSettings();
		};
		
		self.getSettings = function () {
			appSettingService.getSettings().then(function(response){
				self.appSettings = response;
				self.appSettingClone = angular.copy(self.appSettings);
			}, function(err){
				console.log(err);
			});
		};
		self.updateSettings = function () {
			appSettingService.updateSettings(self.appSettings).then(function(){
				self.showMessage = true;
				$timeout(function () {
					self.showMessage = false;
					self.disableSaveBtn = true;
				},3000);
			}, function () {
				
			});
		};
		
		self.updateModel = function () {
			if (angular.equals(self.appSettingClone.Data,self.appSettings.Data)) {
	    		self.disableSaveBtn = true;
	    	}else {
	    		self.disableSaveBtn = false;
	    	}
		};
		init();

	});